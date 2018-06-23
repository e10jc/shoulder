import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Flex, Heading, Text} from 'rebass'

import {AuthContext} from '../layouts/index'
import Div from './div'

const handleLogoutClick = (auth) => () => {
  auth.currentUser().logout()
}

export default () => (
  <AuthContext.Consumer>
    {(auth) => (
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
              {!auth.currentUser() ? (
                <>
                  <Link to='/login'>
                    <Text color='white' p={3}>Login</Text>
                  </Link>
                  <Link to='/signup'>
                    <Text bg='lightPurple' color='white' px={4} py={3}>Sign up</Text>
                  </Link>
                </>
              ) : (
                <Text color='white' p={3} onClick={handleLogoutClick(auth)}>Logout</Text>
              )}
            </Flex>
          </Div>
        </Flex>
      </Box>
    )}
  </AuthContext.Consumer>
)