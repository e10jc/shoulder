import * as React from 'react'
import {Provider} from 'rebass'
import {injectGlobal} from 'styled-components'

import Header from '../components/header'
import Auth from '../helpers/auth'
import ConfirmedModal from '../modals/confirmed'

const theme = {
  colors: {
    darkPurple: '#352734',
    lightPurple: '#674A64',
    purple: '#5A4258',
    red: '#FF565C',
  }
}

injectGlobal`
  a { text-decoration: none }
  html, body { margin: 0 }
`

const auth = Auth()
export const AuthContext = React.createContext(auth)

interface Props {
  children: any,
}

class HomePage extends React.Component<Props> {
  render () {
    return (
      <Provider theme={theme}>
        <AuthContext.Provider value={auth}>
          <Header />
          {this.props.children()}
          <ConfirmedModal />
        </AuthContext.Provider>
      </Provider>
    )
  }
}

export default HomePage
