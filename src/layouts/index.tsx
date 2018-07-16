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
  },
  fonts: {
    sans: 'Lato, sans-serif',
  }
}

injectGlobal`
  a { text-decoration: none }
  html, body { margin: 0 }
  html, body, #___gatsby, #___gatsby > div, #___gatsby > div > div { height: 100% }

  .sans-2 { font-family: 'Open Sans', sans-serif }
  .serif { font-family: 'Libre Baskerville', serif }
`

export const AuthContext = React.createContext(null)

interface Props {children: any}

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
          <Flex flexDirection='column' justifyContent='space-between'>
            <Header />
            <Box flex='1'>{this.props.children()}</Box>
            <Footer />
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
