import * as React from 'react'
import * as Markdown from 'react-markdown'
import {Box, Caps, Container, Flex, Heading, Text} from 'rebass'

import {GSection} from '../pages/guide'

interface Props {
  sections: GArray<GSection>,
}

class Guide extends React.Component<Props> {
  render () {
    const {sections: {edges: sections}} = this.props

    return (
      <Box>
        <Container maxWidth={900}>
          <Flex flexWrap='wrap' mx={-3} my={3}>
            <Box px={3} width={[1, 1, 1 / 4]}>
              <NavContainer>
                <Box px={3} py={4}>
                  <Caps>Timeline</Caps>
                </Box>
                {sections.map(({node: {id, title}}) => (
                  <Box bg='red' color='white' key={id} p={4}>
                    <Text>{title}</Text>
                  </Box>
                ))}
              </NavContainer>
            </Box>

            <Box px={3} width={[1, 1, 3 / 4]}>
              {sections.map(({node: {blocks, id}}) => (
                <Box key={id}>
                  {blocks.map(({body: {body}, id, title}) => (
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

export default Guide

const NavContainer = Box.extend`
  box-shadow: 0px 0px 15px #bbb;
  `