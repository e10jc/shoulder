import * as React from 'react'
import {Box, Caps, Flex, Heading, Text} from 'rebass'

import {GSection} from '../pages/guide'

interface Props {
  sections: GArray<GSection>,
}

class Guide extends React.Component<Props> {
  render () {
    const {sections: {edges: sections}} = this.props

    return (
      <Box>
        <Flex flexWrap='wrap'>
          <NavContainer width={[1, 1 / 4]}>
            <Box px={3} py={4}>
              <Caps>Timeline</Caps>
            </Box>
            {sections.map(({node: {id, title}}) => (
              <Box bg='red' color='white' key={id} p={4}>
                <Text>{title}</Text>
              </Box>
            ))}
            
          </NavContainer>

          {sections.map(({node: {blocks, id}}) => (
            <Box key={id} width={[1, 3 / 4]}>
              {blocks.map(({body: {body}, id, title}) => (
                <Box key={id}>
                  <Heading>{title}</Heading>
                  <Text>{body}</Text>
                </Box>
              ))}
            </Box>
          ))}
        </Flex>
      </Box>
    )
  }
}

export default Guide

const NavContainer = Box.extend`
  box-shadow: 0px 0px 15px #bbb;
  `