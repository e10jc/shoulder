import * as React from 'react'
import {Box, Flex, Provider} from 'rebass'
import {injectGlobal} from 'styled-components'

import Footer from '../components/footer'
import Header from '../components/header'
import {didFinishQuiz} from '../helpers/quiz'
import ConfirmedModal from '../modals/confirm'

export const theme = {
  colors: {
    darkPurple: '#352734',
    darkWhite: '#F5F5F5',
    lightPurple: '#674A64',
    purple: '#5A4258',
    red: '#FF565C',
  }
}

injectGlobal`
  a { text-decoration: none }
  html, body { margin: 0 }
  html, body, #___gatsby, #___gatsby > div, #___gatsby > div > div { height: 100% }
`

export const AuthContext = React.createContext(null)

interface Props {children: any}

interface State {
  canViewGuide: boolean,
  currentUser: object,
}

class Layout extends React.Component<Props, State> {
  auth

  state = {
    canViewGuide: null,
    currentUser: null,
  }

  componentDidMount () {
    this.initAuth()
  }

  render () {
    const authContextValue = {
      currentUser: this.state.currentUser, 
      canViewGuide: this.state.canViewGuide, 
      confirm: this.confirm, 
      login: this.login, 
      logout: this.logout, 
      signup: this.signup
    }

    return (
      <Provider theme={theme}>
        <AuthContext.Provider value={authContextValue}>
          <Flex flexDirection='column' justifyContent='space-between'>
            <Header />
            <Box flex='1'>{this.props.children()}</Box>
            <Footer />
          </Flex>
          <ConfirmedModal />
        </AuthContext.Provider>
      </Provider>
    )
  }

  initAuth = () => {
    const GoTrue = require('gotrue-js').default
    this.auth = new GoTrue({
      APIUrl: process.env.GATSBY_NETLIFY_IDENTITY_URL,
      audience: '',
      setCookie: true,
    })
    this.updateStateForCurrentUser()
  }

  async stateAuthFn (fn) {
    await fn(this.auth)
    this.updateStateForCurrentUser()
  }

  confirm = (...opts) => this.stateAuthFn(auth => auth.confirm(...opts))
  login = (...opts) => this.stateAuthFn(auth => auth.login(...opts))
  logout = () => this.stateAuthFn(auth => auth.currentUser().logout())
  signup = (...opts) => this.stateAuthFn(async auth => {
    // can't remember users through auth.signup
    await auth.signup(...opts)
    return auth.login(...[...opts, true])
  })

  updateStateForCurrentUser = () => {
    const currentUser = this.auth.currentUser()

    this.setState({
      ...this.state,
      canViewGuide: didFinishQuiz(currentUser), 
      currentUser,
    })
  }
}

export default Layout
