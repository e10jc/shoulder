import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Flex, Heading, Text} from 'rebass'

import {AuthContext} from '../layouts/index'
import Div from './div'

interface Props {
  canViewGuide: boolean,
  currentUser: object,
  logout: () => any,
}

class Header extends React.Component<Props> {
  render () {
    const {canViewGuide, currentUser, logout} = this.props

    return (
      <Box bg='purple'>
        <Flex justifyContent='space-between'>
          <Box>
            <Link to='/'>
              <Heading color='white' fontSize={3} p={3}>Shoulder.</Heading>
            </Link>
          </Box>
          <Div display={['none', 'block']}>
            <Flex>
              <Link to={canViewGuide ? '/guide/' : '/quiz/'}>
                <Text color='white' p={3}>Guide</Text>
              </Link>
              <Link to='/about/'>
                <Text color='white' p={3}>About</Text>
              </Link>
              {!currentUser ? (
                <>
                  <Link to='/login/'>
                    <Text color='white' p={3}>Login</Text>
                  </Link>
                  <Link to='/signup/'>
                    <Text bg='lightPurple' color='white' px={4} py={3}>Sign up</Text>
                  </Link>
                </>
              ) : (
                <Text color='white' p={3} onClick={logout}>Logout</Text>
              )}
            </Flex>
          </Div>
        </Flex>
      </Box>
    )
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide, currentUser, logout}) => <Header {...props} canViewGuide={canViewGuide} currentUser={currentUser} logout={logout} />}
  </AuthContext.Consumer>
)
