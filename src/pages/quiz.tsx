import * as React from 'react'
import {Box, Button, ButtonOutline, Container, Flex, Heading, Input, Label, Select, Text} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'
import {get as getFromLocalStorage, set as setInLocalStorage} from '../helpers/local-storage'
import * as states from '../helpers/united-states.json'
import {AuthContext} from '../layouts'

export interface GRecency {
  name: string,
}

export interface GReligion {
  name: string,
}

interface Props {
  currentUser: object,
  data: {
    heroDefaultBgImage: any,
    recencyHero: HeroProps,
    religionHero: HeroProps,
    signupHero: HeroProps,
    stateHero: HeroProps,
    recencies: GArray<GRecency>,
    religions: GArray<GReligion>,
  },
  signup: (email: string, password: string) => any,
}

interface State {
  inputEmail: string,
  inputPassword: string,
  recencyInput: string,
  religionInput: string,
  selRecency: string,
  selReligion: string,
  selState: string,
  stateInput: string,
}

class QuizPage extends React.Component<Props, State> {
  state = {
    inputEmail: '',
    inputPassword: '',
    recencyInput: '',
    religionInput: '',
    selRecency: getFromLocalStorage(selRecencyKey) || '',
    selReligion: getFromLocalStorage(selReligionKey) || '',
    selState: getFromLocalStorage(selStateKey) || '',
    stateInput: '',
  }

  render () {
    const {currentUser, data: {heroDefaultBgImage, recencyHero, recencies: {edges: recencies}, religionHero, religions: {edges: religions}, signupHero, stateHero}} = this.props
    const {recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Hero bgImage={heroDefaultBgImage} content={
        <Container maxWidth={800}>
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
              <Title>{stateHero.title}</Title>
              <Body>{stateHero.body.body}</Body>
              <Select color='black' mb={3} onChange={this.handleStateSelectChange}>
                <option />
                {Object.keys(states).map(acronym => <option key={acronym} value={acronym}>{states[acronym]}</option>)}
              </Select>
              <Button bg='white' color='purple'>Submit</Button>
            </form>
          )}

          {selState && !selReligion && (
            <form onSubmit={this.handleSubmit('selReligion', 'religionInput')}>
              <Title>{religionHero.title}</Title>
              <Body>{religionHero.body.body}</Body>
              <Box mb={3}>
                {religions.map(({node: {name}}) => (
                  <ButtonOutline color='white' key={name} onClick={this.handleOptionClick('religionInput', name)}>{name}</ButtonOutline>
                ))}
              </Box>
              <Button>Submit</Button>
            </form>
          )}

          {selState && selReligion && !selRecency && (
            <form onSubmit={this.handleSubmit('selRecency', 'recencyInput')}>
              <Title>{recencyHero.title}</Title>
              <Body>{recencyHero.body.body}</Body>
              <Box mb={3}>
                {recencies.map(({node: {name}}) => (
                  <ButtonOutline key={name} onClick={this.handleOptionClick('recencyInput', name)}>{name}</ButtonOutline>
                ))}
              </Box>
              <Button bg='white' color='purple'>Submit</Button>
            </form>
          )}

          {selState && selReligion && selRecency && !currentUser && (
            <Box>
              <Title>{signupHero.title}</Title>
              <Body>{signupHero.body.body}</Body>
              <form onSubmit={this.handleSignupSubmit()}>
                <Label>Email</Label>
                <Input mb={3} onChange={this.handleInputChange('inputEmail')} type='email' required value={this.state.inputEmail} />
                <Label>Password</Label>
                <Input mb={3} onChange={this.handleInputChange('inputPassword')} type='password' required value={this.state.inputPassword} />
                <Button type='submit'>Submit</Button>
              </form>
            </Box>
          )}
        </Container>
      } />
    )
  }

  handleInputChange = (stateKey: string) => e => {
    this.setState({...this.state, [stateKey]: e.target.value})
  }

  handleOptionClick = (stateKey: string, stateValue: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [stateKey]: stateValue})
  }

  handleSignupSubmit = () => async (e) => {
    e.preventDefault()
    try {
      await this.props.signup(this.state.inputEmail, this.state.inputPassword)
      window.location.href = '/guide/'
    } catch (err) {
      alert(`Error signing up: ${err.message}`)
    }
  }

  handleStateSelectChange = e => {
    this.setState({...this.state, stateInput: e.target.value})
  }

  handleSubmit = (toStateKey: string, fromStateKey: string) => (e) => {
    e.preventDefault()
    const value = this.state[fromStateKey]
    this.setState({...this.state, [toStateKey]: value})
    setInLocalStorage(createLocalStorageKey(toStateKey), value)
  }
}

export default props => (
  <AuthContext.Consumer>
    {({currentUser, signup}) => <QuizPage {...props} currentUser={currentUser} signup={signup} />}
  </AuthContext.Consumer>
)

export const createLocalStorageKey = (key: string) => `quiz:${key}`

export const selRecencyKey = createLocalStorageKey('selRecency')
export const selReligionKey = createLocalStorageKey('selReligion')
export const selStateKey = createLocalStorageKey('selState')

export const didFinishQuiz = currentUser => !!(
  currentUser && getFromLocalStorage(selStateKey) && getFromLocalStorage(selReligionKey) && getFromLocalStorage(selRecencyKey)
)

const ProgressLineContainer = Box.extend.attrs({px: 1, w: 1 / 4})``

const ProgressLine = Box.extend`
  height: 8px;
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