import * as React from "react"
import {Box} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'

interface Props {
  data: {
    homeHero: HeroProps,
  }
}

const HomePage = ({data: {homeHero}}: Props) => (
  <Box>
    <Hero {...homeHero} />
    <Box>Rest of homepage</Box>
  </Box>
)

export default HomePage

export const query = graphql`
  query homeQuery {
    homeHero: contentfulHero (contentful_id: {eq: "ngDKvizQGsA8iImmia4yI"}) {
      title
      body {
        body
      }
      linkUrl
      linkTitle
    }
  }`
  