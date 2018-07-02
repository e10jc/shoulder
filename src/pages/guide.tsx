import * as React from 'react'
import * as Markdown from 'react-markdown'
import {Box, Caps, Container, Flex, Heading, Text} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'

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

class GuidePage extends React.Component<Props> {
  render () {
    const {data: {guideHero, sections: {edges: sections}}} = this.props

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
                {sections && sections.map(({node: {id, title}}) => (
                  <Box bg='red' color='white' key={id} p={4}>
                    <Text>{title}</Text>
                  </Box>
                ))}
              </NavContainer>
            </Box>

            <Box px={3} width={[1, 1, 3 / 4]}>
              {sections && sections.map(({node: {blocks, id}}) => (
                <Box key={id}>
                  {blocks && blocks.map(({body: {body}, id, title}) => (
                    <Box key={id} mb={3}>
                      <Heading fontSize={4} mb={2}>{title}</Heading>
                      <Markdown source={body} />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Flex>
        </Container>
      </Box>
    )
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