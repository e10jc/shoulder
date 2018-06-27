import * as React from 'react'
import {Box, Flex, Provider} from 'rebass'
import {injectGlobal} from 'styled-components'

import Footer from '../components/footer'
import Header from '../components/header'
import ConfirmedModal from '../modals/confirm'

const theme = {
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
interface State {currentUser: object}

class Layout extends React.Component<Props, State> {
  auth
  state = {currentUser: null}

  constructor (props) {
    super(props)
    this.initAuthForBrowser()
  }

  render () {
    return (
      <Provider theme={theme}>
        <AuthContext.Provider value={{currentUser: this.state.currentUser, confirm: this.confirm, login: this.login, logout: this.logout, signup: this.signup}}>
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

  initAuthForBrowser = () => {
    if (typeof window !== 'undefined') {
      const GoTrue = require('gotrue-js').default
      this.auth = new GoTrue({
        APIUrl: process.env.GATSBY_NETLIFY_IDENTITY_URL,
        audience: '',
        setCookie: true,
      })
      this.state = {...this.state, currentUser: this.auth.currentUser()}
    }
  }

  async stateAuthFn (fn) {
    await fn(this.auth)
    this.setState({...this.state, currentUser: this.auth.currentUser()})
  }

  confirm = (...opts) => this.stateAuthFn(auth => auth.confirm(...opts))
  login = (...opts) => this.stateAuthFn(auth => auth.login(...opts))
  logout = () => this.stateAuthFn(auth => auth.currentUser().logout())
  signup = (...opts) => this.stateAuthFn(async auth => {
    // can't remember users through auth.signup
    await auth.signup(...opts)
    return auth.login(...[...opts, true])
  })
}

export default Layout
