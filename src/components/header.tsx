import Link from 'gatsby-link'
import * as React from 'react'
import {Box, Flex, Heading, Text} from 'rebass'

import {AuthContext} from '../layouts/index'
import {didFinishQuiz} from '../pages/quiz'
import Div from './div'

interface Props {
  currentUser: object,
  logout: () => any,
}

interface State {
  didFinishQuiz: boolean,
}

class Header extends React.Component<Props, State> {
  state = {
    didFinishQuiz: false,
  }

  static getDerivedStateFromProps (props, state) {
    state.didFinishQuiz = didFinishQuiz(props.currentUser)
    return state
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      didFinishQuiz: didFinishQuiz(this.props.currentUser),
    })
  }

  render () {
    const {currentUser, logout} = this.props
    const {didFinishQuiz} = this.state

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
              <Link to={didFinishQuiz ? '/guide/' : '/quiz/'}>
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
    {({currentUser, logout}) => <Header {...props} currentUser={currentUser} logout={logout} />}
  </AuthContext.Consumer>
)
