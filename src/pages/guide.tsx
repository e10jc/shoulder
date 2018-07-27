import {navigateTo} from 'gatsby-link'
import * as qs from 'qs'
import * as React from 'react'
import * as Markdown from 'react-markdown'
import {CSSTransitionGroup} from 'react-transition-group'
import {BlockLink, Border, Box, Caps, Checkbox, Divider, Flex, Heading, Text} from 'rebass'
import {injectGlobal} from 'styled-components'

import Div from '../components/div'
import ButtonOutline from '../components/button-outline'
import Hero, {Props as HeroProps} from '../components/hero'
import Meta from '../components/meta'
import Chart from '../components/chart'
import {get as getFromLocalStorage, set as setInLocalStorage} from '../helpers/local-storage'
import {AuthContext} from '../layouts'
import ShareModal from '../modals/share'

injectGlobal`
  .block-enter {
    opacity: 0.01;
  }

  .block-enter.block-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .block-leave {
    opacity: 1;
  }

  .block-leave.block-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  .raw-content {
    img { max-width: 100% }
  }
`

export interface GBlock {
  body: {body: string},
  id: string,
  title: string,
}

export interface GSection {
  blocks: GBlock[],
  id: string,
  title: string,
}

interface Props extends GatsbyProps {
  canViewGuide: boolean,
  data: {
    contentfulGuidePage: {
      hero: HeroProps,
      meta: Meta,
      pricingGuide: {
        sections: {
          averagePrice: number,
          highPrice: number,
          id: string,
          lowPrice: number,
          title: string,
        }[],
      },
      sections: {
        blocks: {
          body: {
            body: string,
          },
          id: string,
          title: string,
        }[],
        id: string,
        title: string,
      }[],
    },
    heroDefaultBgImage: any,
  },
}

interface State {
  blocksCompleted: {sIdx?: {bIdx?: boolean}},
  isShareModalOpen: boolean,
  selBlockIdxs: number[],
  selPriGuidIdx: number,
  selSectionIdx: number,
}

const BORDER_COLOR = '#f1f1f1'
const BLOCKS_COMPLETED_KEY = 'guide:completed'

class GuidePage extends React.Component<Props, State> {
  state = {
    blocksCompleted: {},
    isShareModalOpen: false,
    selBlockIdxs: [],
    selPriGuidIdx: 0,
    selSectionIdx: 0,
  }

  componentDidMount () {
    this.prepareFromBrowser()
    this.maybeNavigateToQuiz()
  }

  componentDidUpdate () {
    this.maybeNavigateToQuiz()
  }

  render () {
    const {data: {contentfulGuidePage: {hero, meta, pricingGuide, sections}, heroDefaultBgImage}} = this.props
    const {selBlockIdxs, selPriGuidIdx, selSectionIdx} = this.state

    const activeSection = sections[selSectionIdx]
    const blocks = activeSection && activeSection.blocks

    const sectionBgColor = i => {
      if (i === selSectionIdx) return 'red'
      if (i === sections.length - 1) return 'lightPurple'
      return 'purple'
    }

    return (
      <Flex flex='1' flexDirection='column'>
        <Meta meta={meta} />

        <Hero bgImage={heroDefaultBgImage} buttonAlign='right' handleLinkClick={this.handleShareModalOpen} imgPosition='center center' py={4} {...hero} />

        <Flex flex='1' flexWrap='wrap'>
          <Box bg='purple' color='white' width={[1, 1 / 4]}>
            {sections && sections.map(({id, title}, i) => (
              <Border border='none' borderBottom='1px solid' borderColor='rgba(255,255,255,0.15)' key={id}>
                <BlockLink
                  bg={sectionBgColor(i)}
                  color='white'
                  href='javascript:void(0)'
                  onClick={this.handleSectionClick(i)}
                  px={3}
                  py={4}
                >
                  {(() => {
                    switch (i) {
                      case 0: return <Caps fontWeight='bold'>Timeline</Caps>
                      case sections.length - 1: return <Caps fontWeight='bold'>Pricing Guide</Caps>
                      default: return (
                        <Text>
                          <Div display='inline' pr={2} style={{opacity: '0.25'}}>{i}</Div> {title}
                        </Text>
                      )
                    }
                  })()}
                </BlockLink>
              </Border>
            ))}
          </Box>

          <Box width={[1, 3 / 4]}>
            <Box p={4}>
              {blocks.length && blocks.map(({body, id, title}, j) => {
                const isCompleted = this.isBlockCompleted(j)
                const isSelected = selBlockIdxs.indexOf(j) !== -1

                return <Div key={id} mb={3} opacity={isCompleted ? '0.25' : null}>
                  <Heading fontSize={4} mb={2}>
                    <Flex alignItems='center'>
                      <BlockCheckbox checked={isCompleted} mr={3} onClick={this.handleBlockCheckboxClick(j)} readOnly />
                      <Box flex='1'>
                        <BlockLink
                          href='javascript:void(0)'
                          onClick={this.handleBlockTitleClick(j)}
                        >
                          <Flex alignItems='center' justifyContent='space-between'>
                            {title}
                            <TitleArrow direction={isSelected ? 'down' : 'right'} />
                          </Flex>
                        </BlockLink>
                      </Box>                    
                    </Flex>
                  </Heading>
                  
                  <CSSTransitionGroup
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionName='block'
                  >
                    {isSelected && <Border border='none' borderColor={BORDER_COLOR} borderLeft='1px solid' key='body' pl='30px'>
                      <Markdown className='raw-content' source={body && body.body} />
                    </Border>}
                  </CSSTransitionGroup>

                  <Divider borderColor={BORDER_COLOR} />
                </Div>
              })}

              {selSectionIdx === 4 && <Box>
                <Box mb={3}>
                  {pricingGuide.sections.map(({id, title}, i) => <ButtonOutline isSelected={selPriGuidIdx === i} key={id} mr={1} onClick={this.handlePricingGuideTopicClick(i)}>
                    {title}
                  </ButtonOutline>)}
                </Box>
                <Chart
                  data={(() => {
                    const section = pricingGuide.sections[selPriGuidIdx]
                    return [section.lowPrice, section.averagePrice, section.highPrice]
                  })()}
                  key={selPriGuidIdx}
                />
              </Box>}
            </Box>
          </Box>
        </Flex>

        <ShareModal isOpen={this.state.isShareModalOpen} handleClose={this.handleShareModalClose} />
      </Flex>
    )
  }
  
  handleBlockCheckboxClick = (blockIdx) => () => {
    const {blocksCompleted, selSectionIdx} = this.state
    if (!blocksCompleted[selSectionIdx]) blocksCompleted[selSectionIdx] = {}
    blocksCompleted[selSectionIdx][blockIdx] = !blocksCompleted[selSectionIdx][blockIdx]
    this.setState({...this.state, blocksCompleted})
    setInLocalStorage(BLOCKS_COMPLETED_KEY, JSON.stringify(blocksCompleted))
  }

  handleBlockTitleClick = (blockIdx) => () => {
    const {selBlockIdxs} = this.state
    const idx = selBlockIdxs.indexOf(blockIdx)
    this.setState({
      ...this.state, 
      selBlockIdxs: idx === -1 ? selBlockIdxs.concat(blockIdx) : selBlockIdxs.filter((_, x) => x !== idx),
    })
  }

  handlePricingGuideTopicClick = (priGuidIdx) => () => {
    this.setState({...this.state, selPriGuidIdx: priGuidIdx})
  }

  handleSectionClick = (sectionIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdxs: [],
      selSectionIdx: sectionIdx,
    })
    navigateTo(`/guide?s=${sectionIdx}`)
  }

  handleShareModalClose = () => this.setState({...this.state, isShareModalOpen: false})
  handleShareModalOpen = () => this.setState({...this.state, isShareModalOpen: true})

  isBlockCompleted = (blockIdx): boolean => {
    const {blocksCompleted, selSectionIdx} = this.state
    if (!blocksCompleted[selSectionIdx]) return false
    return !!blocksCompleted[selSectionIdx][blockIdx]
  }

  maybeNavigateToQuiz = () => {
    if (this.props.canViewGuide === false) {
      navigateTo('/quiz/')
    }
  }

  prepareFromBrowser = () => {
    const state: any = {}

    const blocksCompletedS = getFromLocalStorage(BLOCKS_COMPLETED_KEY)
    if (blocksCompletedS) state.blocksCompleted = JSON.parse(blocksCompletedS)

    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
    if (query.s) state.selSectionIdx = parseInt(query.s)

    this.setState({...this.state, ...state})
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide}) => <GuidePage {...props} canViewGuide={canViewGuide} />}
  </AuthContext.Consumer>
)
export const query = graphql`
  query guideQuery {
    ...heroDefaultBgImage

    contentfulGuidePage (contentful_id: {eq: "7D3of8RGHmaYsKwYaSE4wA"}) {
      hero {
        title
        body {body}
        linkUrl
        linkTitle
      }
      
      meta {
        description
        image {
          title
          file {url}
        }
        title
      }

      pricingGuide {
        sections {
          id
          averagePrice
          highPrice
          lowPrice
          title
        }
      }
      
      sections {
        blocks {
          body {body}
          id
          title
        }
        id
        title
      }
    }
  }
`

const BlockCheckbox = Checkbox.extend`
  transform: scale(1.4);
`

const NavContainer = Box.extend`
  box-shadow: 0px 0px 15px #bbb;
`

const TitleArrow = Box.extend`
  &:after {
    content: "\\02192";
    display: block;
    transform: rotate(${(props) => props.direction === 'down' ? '90deg' : '0deg'});
  }
`