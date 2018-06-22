import Link from 'gatsby-link'
import * as React from 'react'

export default ({children}) => (
  <div>
    <Link to='/'>Home</Link>
    {children()}
  </div>
)