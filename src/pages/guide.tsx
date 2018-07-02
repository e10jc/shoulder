import * as React from 'react'
import * as Markdown from 'react-markdown'
import {BlockLink, Box, Caps, Checkbox, Container, Flex, Heading, Text} from 'rebass'
import {injectGlobal} from 'styled-components'

import Hero, {Props as HeroProps} from '../components/hero'
import Div from '../components/div'

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
  data: {
    guideHero: HeroProps,
    sections: GArray<GSection>,
  },
}

interface State {
  selBlockIdx: number,
  selSectionIdx: number,
}

class GuidePage extends React.Component<Props, State> {
  state = {
    selBlockIdx: 0,
    selSectionIdx: 0,
  }

  render () {
    const {data: {guideHero, sections: {edges: sections}}} = this.props
    const {selBlockIdx, selSectionIdx} = this.state

    const activeSection = sections[selSectionIdx]
    const blocks = activeSection && activeSection.node.blocks

    return (
      <Box>
        <Hero {...guideHero} />
        <Container maxWidth={900}>
          <Flex flexWrap='wrap' mx={-3} my={3}>
            <Box px={3} width={[1, 1, 1 / 4]}>
              <NavContainer>
                <Box px={3} py={4}>
                  <Caps>Timeline</Caps>
                </Box>
                {sections && sections.map(({node: {id, title}}, i) => (
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
              {blocks && blocks.map(({body: {body}, id, title}, j) => (
                <Div key={id} mb={3}>
                  <Heading fontSize={4} mb={2}>
                    <BlockLink
                      href='javascript:void(0)'
                      onClick={this.handleBlockTitleClick(j)}
                    >
                      <Checkbox checked={selBlockIdx >= j} readOnly />
                      {title}
                    </BlockLink>
                  </Heading>
                  <Div display={selBlockIdx === j ? 'block' : 'none'}>
                    <Markdown className='raw-content' source={body} />
                  </Div>
                </Div>
              ))}
            </Box>
          </Flex>
        </Container>
      </Box>
    )
  }

  handleBlockTitleClick = (blockIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdx: blockIdx,
    })
  }

  handleSectionClick = (sectionIdx) => () => {
    this.setState({
      ...this.state, 
      selBlockIdx: 0,
      selSectionIdx: sectionIdx,
    })
  }
}

export default GuidePage

export const query = graphql`
  query guideQuery {
    guideHero: contentfulHero (contentful_id: {eq: "3qaxnqaxuooqu8SESGgGMY"}) {
      title
      body {body}
      linkUrl
      linkTitle
    }

    sections: allContentfulGuideSection (sort: {fields: [order]}) {
      edges {
        node {
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
  }
`

const NavContainer = Box.extend`
  box-shadow: 0px 0px 15px #bbb;
`