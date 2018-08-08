import * as React from 'react'
import {Box, Flex, Provider} from 'rebass'
import {injectGlobal} from 'styled-components'

import Footer from '../components/footer'
import Header from '../components/header'
import {didFinishQuiz} from '../helpers/quiz'

export const theme = {
  colors: {
    darkPurple: '#352734',
    darkWhite: '#F5F5F5',
    lightPurple: '#674A64',
    purple: '#5A4258',
    red: '#FF565C',
    yellow: '#EDB732',
  },
  fonts: {
    sans: 'Lato, sans-serif',
  }
}

export const PAGE_WIDTH = 900

injectGlobal`
  a { text-decoration: none }
  button:hover { cursor: pointer }
  html, body { margin: 0 }

  .sans-2 { font-family: 'Open Sans', sans-serif }
  .serif { font-family: 'Libre Baskerville', serif }

  .red { color: ${theme.colors.red} }
  .yellow { color: ${theme.colors.yellow} }
`

export const AuthContext = React.createContext({
  canViewGuide: null,
  initAuth: null,
})

interface Props {
  children: any,
  hideFooter?: boolean,
  hideHeader?: boolean,
}

interface State {
  canViewGuide: boolean,
}

class Layout extends React.Component<Props, State> {
  auth

  state = {
    canViewGuide: null,
  }

  componentDidMount () {
    this.initAuth()
  }

  render () {
    const authContextValue = {
      canViewGuide: this.state.canViewGuide,
      initAuth: this.initAuth,
    }

    return (
      <Provider theme={theme}>
        <AuthContext.Provider value={authContextValue}>
          <Flex flexDirection='column' justifyContent='space-between' style={{minHeight: '100vh'}}>
            {!this.props.hideHeader && <Header />}
            <Flex flex='1' flexDirection='column'>{this.props.children}</Flex>
            {!this.props.hideFooter && <Footer />}
          </Flex>
        </AuthContext.Provider>
      </Provider>
    )
  }

  initAuth = () => {
    this.setState({
      ...this.state,
      canViewGuide: didFinishQuiz(), 
    })
  }
}

export default Layout
