import {navigateTo} from 'gatsby-link'
import * as React from 'react'
import {Box, Button, Container, Flex, Heading, Input, Label, Select, Text} from 'rebass'

import ButtonOutline from '../components/button-outline'
import Hero, {Props as HeroProps} from '../components/hero'
import Layout, {AuthContext, PAGE_WIDTH} from '../components/layout'
import {get as getFromLocalStorage, set as setInLocalStorage} from '../helpers/local-storage'
import * as states from '../helpers/united-states.json'
import {createLocalStorageKey, entEmailKey, selRecencyKey, selReligionKey, selStateKey} from '../helpers/quiz'

export interface GRecency {
  name: string,
}

export interface GReligion {
  name: string,
}

interface Props {
  canViewGuide: boolean,
  data: {
    heroDefaultBgImage: any,
    recencyHero: HeroProps,
    religionHero: HeroProps,
    signupHero: HeroProps,
    stateHero: HeroProps,
    recencies: GArray<GRecency>,
    religions: GArray<GReligion>,
  },
  initAuth: () => any,
}

interface State {
  entEmail: string,
  inputEmail: string,
  recencyInput: string,
  religionInput: string,
  selRecency: string,
  selReligion: string,
  selState: string,
  stateInput: string,
}

class QuizPage extends React.Component<Props, State> {
  state = {
    entEmail: '',
    inputEmail: '',
    recencyInput: '',
    religionInput: '',
    selRecency: '',
    selReligion: '',
    selState: '',
    stateInput: '',
  }

  componentDidMount () {
    this.maybeNavigateToGuide()
    this.setState({
      ...this.state,
      entEmail: getFromLocalStorage(entEmailKey) || '',
      selRecency: getFromLocalStorage(selRecencyKey) || '',
      selReligion: getFromLocalStorage(selReligionKey) || '',
      selState: getFromLocalStorage(selStateKey) || '',
    })
  }

  componentDidUpdate () {
    this.maybeNavigateToGuide()
  }

  render () {
    const {data: {heroDefaultBgImage, recencyHero, recencies: {edges: recencies}, religionHero, religions: {edges: religions}, signupHero, stateHero}} = this.props
    const {entEmail, recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Layout>
        <Hero bgImage={heroDefaultBgImage} content={
          <Container maxWidth={PAGE_WIDTH}>
            <Flex mx={-1}>
              <ProgressLineContainer>
                <ProgressLine bg='red'>&nbsp;</ProgressLine>
              </ProgressLineContainer>
              <ProgressLineContainer>
                <ProgressLine bg={selState ? 'red' : 'white'}>&nbsp;</ProgressLine>
              </ProgressLineContainer>
              <ProgressLineContainer>
                <ProgressLine bg={selState && selReligion ? 'red' : 'white'}>&nbsp;</ProgressLine>
              </ProgressLineContainer>
              <ProgressLineContainer>
                <ProgressLine bg={selState && selReligion && selRecency ? 'red' : 'white'}>&nbsp;</ProgressLine>
              </ProgressLineContainer>
            </Flex>

            {!selState && (
              <form onSubmit={this.handleSubmit('selState', 'stateInput')}>
                <Title className='serif'>{stateHero.title}</Title>
                <Body>{stateHero.body.body}</Body>
                <StateSelect color='black' mb={3} onChange={this.handleStateSelectChange}>
                  <option />
                  {Object.keys(states).map(acronym => <option key={acronym} value={acronym}>{states[acronym]}</option>)}
                </StateSelect>
                <Button bg='white' color='purple'>Submit</Button>
              </form>
            )}

            {selState && !selReligion && (
              <form onSubmit={this.handleSubmit('selReligion', 'religionInput')}>
                <Title className='serif'>{religionHero.title}</Title>
                <Body>{religionHero.body.body}</Body>
                <Box mb={3}>
                  {religions.map(({node: {name}}) => (
                    <ButtonOutline isSelected={religionInput === name} key={name} onClick={this.handleOptionClick('religionInput', name)}>{name}</ButtonOutline>
                  ))}
                </Box>
                <Button>Submit</Button>
              </form>
            )}

            {selState && selReligion && !selRecency && (
              <form onSubmit={this.handleSubmit('selRecency', 'recencyInput')}>
                <Title className='serif'>{recencyHero.title}</Title>
                <Body>{recencyHero.body.body}</Body>
                <Box mb={3}>
                  {recencies.map(({node: {name}}) => (
                    <ButtonOutline isSelected={recencyInput === name} key={name} onClick={this.handleOptionClick('recencyInput', name)}>{name}</ButtonOutline>
                  ))}
                </Box>
                <Button bg='white' color='purple'>Submit</Button>
              </form>
            )}

            {selState && selReligion && selRecency && !entEmail && (
              <Box>
                <Title className='serif'>{signupHero.title}</Title>
                <Body>{signupHero.body.body}</Body>
                <form onSubmit={this.handleSubmit('entEmail', 'inputEmail')}>
                  <Label>Email</Label>
                  <Input mb={3} onChange={this.handleInputChange('inputEmail')} type='email' required value={this.state.inputEmail} />
                  <Button type='submit'>Submit</Button>
                </form>
              </Box>
            )}
          </Container>
        } fillVertical />
      </Layout>
    )
  }

  handleInputChange = (stateKey: string) => e => {
    this.setState({...this.state, [stateKey]: e.target.value})
  }

  handleOptionClick = (stateKey: string, stateValue: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [stateKey]: stateValue})
  }

  handleStateSelectChange = e => {
    this.setState({...this.state, stateInput: e.target.value})
  }

  handleSubmit = (toStateKey: string, fromStateKey: string) => (e) => {
    e.preventDefault()

    // save the answer locally
    const value = this.state[fromStateKey]
    this.setState({...this.state, [toStateKey]: value})
    setInLocalStorage(createLocalStorageKey(toStateKey), value)

    // if the quiz is completed
    if (toStateKey === 'entEmail') {
      // redirect to guide
      this.props.initAuth()

      // save in klaviyo
      window._learnq.push(['identify', {
        '$email': value,
        'Quiz: Recency': this.state.selRecency,
        'Quiz: Religion': this.state.selReligion,
        'Quiz: State': this.state.selState,
      }])
    }
  }

  maybeNavigateToGuide = () => {
    if (this.props.canViewGuide) {
      navigateTo('/guide/')
    }
  }
}

export default props => (
  <AuthContext.Consumer>
    {({canViewGuide, initAuth}) => <QuizPage {...props} canViewGuide={canViewGuide} initAuth={initAuth} />}
  </AuthContext.Consumer>
)

const ProgressLineContainer = Box.extend.attrs({px: 1, w: 1 / 4})``
const ProgressLine = Box.extend`
  height: 8px;
`
const StateSelect = Select.extend`
  appearance: menulist;
  background: #fff;
`
const Title = Heading.extend.attrs({mt: 2, mb: 2})``
const Body = Text.extend.attrs({mb: 3})``

export const query = graphql`
  query quizQuery {
    ...heroDefaultBgImage

    recencyHero: contentfulHero (contentful_id: {eq: "4nUmmvxpmE8USgo08oKmii"}) {
      title
      body {body}
    }

    religionHero: contentfulHero (contentful_id: {eq: "6aWYBFZAHewsC4O6CugEwC"}) {
      title
      body {body}
    }

    signupHero: contentfulHero (contentful_id: {eq: "1Hde1yVdDKoKOGIcakuKgo"}) {
      title
      body {body}
    }

    stateHero: contentfulHero (contentful_id: {eq: "6ifAMUeWooQ04Ecq288ca2"}) {
      title
      body {body}
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
  }
`