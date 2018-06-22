import * as React from "react"

import Hero from '../components/hero'

const HomePage = ({data: {homeHero}}) => (
  <div>
    <Hero data={homeHero} />
  </div>
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
  