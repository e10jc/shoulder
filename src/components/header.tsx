import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Flex, Heading, Text} from 'rebass'

import Div from './div'

export default () => (
  <Box bg='purple'>
    <Flex justifyContent='space-between'>
      <Box>
        <Link to='/'>
          <Heading color='white' fontSize={3} p={3}>Shoulder.</Heading>
        </Link>
      </Box>
      <Div display={['none', 'block']}>
        <Flex>
          <Link to='/guide'>
            <Text color='white' p={3}>Guide</Text>
          </Link>
          <Link to='/community'>
            <Text color='white' p={3}>Community</Text>
          </Link>
          <Link to='/about'>
            <Text color='white' p={3}>About</Text>
          </Link>
          <Link to='/signup'>
            <Text bg='lightPurple' color='white' px={4} py={3}>Sign up</Text>
          </Link>
        </Flex>
      </Div>
    </Flex>
  </Box>
)