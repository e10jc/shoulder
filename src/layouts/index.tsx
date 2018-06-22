import * as React from 'react'
import {Provider} from 'rebass'
import {injectGlobal} from 'styled-components'

import Header from '../components/header'

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

export default ({children}) => (
  <Provider theme={theme}>
    <Header />
    {children()}
  </Provider>
)