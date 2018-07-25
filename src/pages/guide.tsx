import {navigateTo} from 'gatsby-link'
import * as qs from 'qs'
import * as React from 'react'
import * as Markdown from 'react-markdown'
import {BlockLink, Border, Box, Caps, Checkbox, Container, Divider, Flex, Heading, Text} from 'rebass'
import {injectGlobal} from 'styled-components'

import Hero, {Props as HeroProps} from '../components/hero'
import Div from '../components/div'
import Meta from '../components/meta'
import Chart from '../components/chart'
import {AuthContext} from '../layouts'
import ShareModal from '../modals/share'

injectGlobal`
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
  isShareModalOpen: boolean,
  selBlockIdxs: number[],
  selSectionIdx: number,
}

const BORDER_COLOR = '#f1f1f1'

class GuidePage extends React.Component<Props, State> {
  state = {
    isShareModalOpen: false,
    selBlockIdxs: [0],
    selSectionIdx: 0,
  }

  componentDidMount () {
    this.setSectionFromQuery()
    this.maybeNavigateToQuiz()
  }

  componentDidUpdate () {
    this.maybeNavigateToQuiz()
  }

  render () {
    const {data: {contentfulGuidePage: {hero, meta, sections}, heroDefaultBgImage}} = this.props
    const {selBlockIdxs, selSectionIdx} = this.state

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
                const isSelected = selBlockIdxs.indexOf(j) !== -1
                return <Div key={id} mb={3}>
                  <Heading fontSize={4} mb={2}>
                    <BlockLink
                      href='javascript:void(0)'
                      onClick={this.handleBlockTitleClick(j)}
                    >
                      <Flex alignItems='center'>
                        <Checkbox checked={isSelected} readOnly />
                        <Box flex='1'>{title}</Box>
                        <TitleArrow direction={isSelected ? 'down' : 'right'} />
                      </Flex>
                    </BlockLink>
                  </Heading>
                  {!isSelected && <Divider borderColor={BORDER_COLOR} />}
                  <Div display={isSelected ? 'block' : 'none'}>
                    <Border border='none' borderColor={BORDER_COLOR} borderLeft='1px solid' pl='22px'>
                      <Markdown className='raw-content' source={body && body.body} />
                    </Border>
                  </Div>
                </Div>
              })}

              {selSectionIdx === 4 && <Chart />}
            </Box>
          </Box>
        </Flex>

        <ShareModal isOpen={this.state.isShareModalOpen} handleClose={this.handleShareModalClose} />
      </Flex>
    )
  }

  handleBlockTitleClick = (blockIdx) => () => {
    const {selBlockIdxs} = this.state
    const idx = selBlockIdxs.indexOf(blockIdx)
    this.setState({
      ...this.state, 
      selBlockIdxs: idx === -1 ? selBlockIdxs.concat(blockIdx) : selBlockIdxs.filter((_, x) => x !== idx),
    })
  }

  handleSectionClick = (sectionIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdxs: [0],
      selSectionIdx: sectionIdx,
    })
    navigateTo(`/guide?s=${sectionIdx}`)
  }

  handleShareModalClose = () => this.setState({...this.state, isShareModalOpen: false})
  handleShareModalOpen = () => this.setState({...this.state, isShareModalOpen: true})

  maybeNavigateToQuiz = () => {
    if (this.props.canViewGuide === false) {
      navigateTo('/quiz/')
    }
  }

  setSectionFromQuery = () => {
    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
    if (query.s) this.setState({...this.state, selSectionIdx: parseInt(query.s)})
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

const NavContainer = Box.extend`
  box-shadow: 0px 0px 15px #bbb;
`

const TitleArrow = Box.extend`
  &:after {
    content: ">";
    display: block;
    transform: rotate(${(props) => props.direction === 'down' ? '90deg' : '0deg'});
  }
`