import * as React from "react"
import {Box} from 'rebass'

import Hero from '../components/hero'

const HomePage = ({data: {homeHero}}) => (
  <Box>
    <Hero data={homeHero} />
    <Box>Rest of homepage</Box>
  </Box>
)

export default HomePage

export const query = graphql`
  query homeQuery {
    homeHero: contentfulHero (id: {eq: "ngDKvizQGsA8iImmia4yI"}) {
      title
      body {
        body
      }
      linkUrl
      linkTitle
    }
  }`
  