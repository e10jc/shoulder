import {navigateTo} from 'gatsby-link'
import * as React from 'react'
import * as Markdown from 'react-markdown'
import {BlockLink, Box, Caps, Checkbox, Container, Flex, Heading, Text} from 'rebass'
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
  selBlockIdx: number,
  selSectionIdx: number,
}

class GuidePage extends React.Component<Props, State> {
  state = {
    isShareModalOpen: false,
    selBlockIdx: 0,
    selSectionIdx: 0,
  }

  componentDidMount () {
    if (this.props.canViewGuide === false) {
      navigateTo('/quiz/')
    }
  }

  render () {
    const {data: {guideHero, heroDefaultBgImage, guide: {sections}}} = this.props
    const {selBlockIdx, selSectionIdx} = this.state

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
              {blocks.length && blocks.map(({body, id, title}, j) => (
                <Div key={id} mb={3}>
                  <Heading fontSize={4} mb={2}>
                    <BlockLink
                      href='javascript:void(0)'
                      onClick={this.handleBlockTitleClick(j)}
                    >
                      <Checkbox checked={selBlockIdx == null ? false : selBlockIdx >= j} readOnly />
                      {title}
                    </BlockLink>
                  </Heading>
                  <Div display={selBlockIdx === j ? 'block' : 'none'}>
                    <Markdown className='raw-content' source={body && body.body} />
                  </Div>
                </Div>
              ))}
            </Box>
          </Flex>
        </Container>

        <ShareModal isOpen={this.state.isShareModalOpen} handleClose={this.handleShareModalClose} />
      </Box>
    )
  }

  handleBlockTitleClick = (blockIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdx: blockIdx === this.state.selBlockIdx ? null : blockIdx,
    })
  }

  handleSectionClick = (sectionIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdx: 0,
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