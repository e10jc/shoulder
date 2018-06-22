import * as React from 'react'
import {Provider} from 'rebass'

import Header from '../components/header'

const theme = {
  colors: {
    darkPurple: '#352734',
    lightPurple: '#674A64',
    purple: '#5A4258',
    red: '#FF565C',
  }
}

export default ({children}) => (
  <Provider theme={theme}>
    <Header />
    {children()}
  </Provider>
)