import * as React from 'react'
import {Box} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'
import Guide from '../components/guide'
import Quiz, {didFinishQuiz} from '../components/quiz'
import {AuthContext} from '../layouts'

export interface GRecency {
  name: string,
}

export interface GReligion {
  name: string,
}

export interface GBlock {
  body: {body: string},
  id: string,
  title: string,
}

export interface GSection {
  blocks: GBlock[],
  id: string,
  title: string,
}

interface Props {
  currentUser: object,
  data: {
    guideHero: HeroProps,
    recencies: GArray<GRecency>,
    religions: GArray<GReligion>,
    sections: GArray<GSection>,
  },
}

interface State {
  didFinishQuiz: boolean,
}

class GuidePage extends React.Component<Props, State> {
  state = {
    didFinishQuiz: didFinishQuiz(this.props.currentUser),
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      didFinishQuiz: didFinishQuiz(props.currentUser)
    }
  }

  render () {
    const {data: {guideHero, recencies, religions, sections}} = this.props

    return (
      <Box>
        {!this.state.didFinishQuiz ? (
          <Quiz recencies={recencies} religions={religions} />
        ) : (
          <Box>
            <Hero {...guideHero} />
            <Guide sections={sections} />
          </Box>
        )}
      </Box>
    )
  }
}

export default props => (
  <AuthContext.Consumer>
    {({currentUser}) => <GuidePage {...props} currentUser={currentUser} />}
  </AuthContext.Consumer>
)

export const query = graphql`
  query guideQuery {
    guideHero: contentfulHero (contentful_id: {eq: "3qaxnqaxuooqu8SESGgGMY"}) {
      title
      body {body}
      linkUrl
      linkTitle
    }
    
    recencies: allContentfulGuidePersonalizationRecency {
      edges {
        node {name}
      }
    }
    
    religions: allContentfulGuidePersonalizationReligion {
      edges {
        node {name}
      }
    }

    sections: allContentfulGuideSection (sort: {fields: [order]}) {
      edges {
        node {
          blocks {
            body {body}
            id
            title
          }
          id
          title
        }
      }
    }
  }`
