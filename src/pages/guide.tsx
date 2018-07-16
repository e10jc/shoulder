import {navigateTo} from 'gatsby-link'
import * as React from 'react'
import * as Markdown from 'react-markdown'
import {BlockLink, Border, Box, Caps, Checkbox, Container, Divider, Flex, Heading, Text} from 'rebass'
import {injectGlobal} from 'styled-components'

import Hero, {Props as HeroProps} from '../components/hero'
import Div from '../components/div'
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

interface Props {
  canViewGuide: boolean,
  data: {
    guide: {
      sections: GSection[],
    },
    guideHero: HeroProps,
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
    if (this.props.canViewGuide === false) {
      navigateTo('/quiz/')
    }
  }

  render () {
    const {data: {guideHero, heroDefaultBgImage, guide: {sections}}} = this.props
    const {selBlockIdxs, selSectionIdx} = this.state

    const activeSection = sections[selSectionIdx]
    const blocks = activeSection && activeSection.blocks

    return (
      <Box>
        <Hero bgImage={heroDefaultBgImage} handleLinkClick={this.handleShareModalOpen} {...guideHero} />
        <Container maxWidth={900}>
          <Flex flexWrap='wrap' mx={-3} my={3}>
            <Box px={3} width={[1, 1, 1 / 4]}>
              <NavContainer>
                <Box px={3} py={4}>
                  <Caps>Timeline</Caps>
                </Box>
                {sections && sections.map(({id, title}, i) => (
                  <BlockLink
                    bg={selSectionIdx === i ? 'red' : 'white'}
                    color={selSectionIdx === i ? 'white' : 'black'}
                    href='javascript:void(0)'
                    key={id}
                    onClick={this.handleSectionClick(i)}
                    p={4}
                  >
                    <Text>{title}</Text>
                  </BlockLink>
                ))}
              </NavContainer>
            </Box>

            <Box px={3} width={[1, 1, 3 / 4]}>
              {blocks.length && blocks.map(({body, id, title}, j) => {
                const isSelected = selBlockIdxs.indexOf(j) !== -1
                return (
                  <Div key={id} mb={3}>
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
                )
              })}
            </Box>
          </Flex>
        </Container>

        <ShareModal isOpen={this.state.isShareModalOpen} handleClose={this.handleShareModalClose} />
      </Box>
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
  }

  handleShareModalClose = () => this.setState({...this.state, isShareModalOpen: false})
  handleShareModalOpen = () => this.setState({...this.state, isShareModalOpen: true})
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide}) => <GuidePage {...props} canViewGuide={canViewGuide} />}
  </AuthContext.Consumer>
)
export const query = graphql`
  query guideQuery {
    ...heroDefaultBgImage

    guideHero: contentfulHero (contentful_id: {eq: "3qaxnqaxuooqu8SESGgGMY"}) {
      title
      body {body}
      linkUrl
      linkTitle
    }

    guide: contentfulGuide (contentful_id: {eq: "7D3of8RGHmaYsKwYaSE4wA"}) {
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