import * as React from 'react'
import {Box, Button, ButtonOutline, Caps, Flex, Heading, Input, Label, Text} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'
import {AuthContext} from '../layouts'

interface Props {
  currentUser: object,
  data: {
    guideHero: HeroProps,
    recencies: {
      edges: {
        node: {name: string}
      }[]
    },
    religions: {
      edges: {
        node: {name: string}
      }[]
    },
  },
  signup: () => any,
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

class GuidePage extends React.Component<Props, State> {
  state = {
    inputEmail: '',
    inputPassword: '',
    recencyInput: '',
    religionInput: '',
    selRecency: loadFromLocalStorageInBrowser('selRecency'),
    selReligion: loadFromLocalStorageInBrowser('selReligion'),
    selState: loadFromLocalStorageInBrowser('selState'),
    stateInput: '',
  }

  render () {
    const {currentUser, data: {guideHero, recencies: {edges: recencies}, religions: {edges: religions}}, signup} = this.props
    const {recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Box>
        {!this.didFinishPersonalizingGuide() && (
          <Box bg='darkGray'>
            <Flex mx={-1}>
              <Box px={1} width={1 / 4}>
                <Box bg={selState ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
              <Box px={1} width={1 / 4}>
                <Box bg={selState && selReligion ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
              <Box px={1} width={1 / 4}>
                <Box bg={selState && selReligion && selRecency ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
              <Box px={1} width={1 / 4}>
                <Box bg={selState && selReligion && selRecency && currentUser ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
            </Flex>

            {!selState && (
              <form onSubmit={this.handleSubmit('selState', 'stateInput')}>
                <Heading>State?</Heading>
                <Text>Laws vary.</Text>
                <Input placeholder='State' onChange={this.handleStateInputChange} />
                <Button bg='white' color='purple'>Submit</Button>
              </form>
            )}

            {selState && !selReligion && (
              <form onSubmit={this.handleSubmit('selReligion', 'religionInput')}>
                <Heading>Religion?</Heading>
                <Box>
                  {religions.map(({node: {name}}) => (
                    <ButtonOutline color='white' key={name} onClick={this.handleOptionClick('religionInput', name)}>{name}</ButtonOutline>
                  ))}
                </Box>
                <Button>Submit</Button>
              </form>
            )}

            {selState && selReligion && !selRecency && (
              <form onSubmit={this.handleSubmit('selRecency', 'recencyInput')}>
                <Heading>Recency?</Heading>
                <Box>
                  {recencies.map(({node: {name}}) => (
                    <ButtonOutline key={name} onClick={this.handleOptionClick('recencyInput', name)}>{name}</ButtonOutline>
                  ))}
                </Box>
                <Button bg='white' color='purple'>Submit</Button>
              </form>
            )}

            {selState && selReligion && selRecency && !currentUser && (
              <Box>
                <Heading>Create an account</Heading>
                <Text>Sign up because it's awesome.</Text>
                <form onSubmit={this.handleSignupSubmit(signup)}>
                  <Label>Email</Label>
                  <Input onChange={this.handleInputChange('inputEmail')} type='email' required value={this.state.inputEmail} />
                  <Label>Password</Label>
                  <Input onChange={this.handleInputChange('inputPassword')} type='password' required value={this.state.inputPassword} />
                  <Button type='submit'>Submit</Button>
                </form>
              </Box>
            )}
          </Box>
        )}

        {this.didFinishPersonalizingGuide() && (
          <Box>
            <Hero {...guideHero} />
            <Flex flexWrap='wrap'>
              <NavContainer width={[1, 1 / 4]}>
                <Box px={3} py={4}>
                  <Caps>Timeline</Caps>
                </Box>
                <Box bg='red' color='white' p={4}>
                  <Text>Things to do immediately</Text>
                </Box>
              </NavContainer>

              <Box width={[1, 3 / 4]}>
                <Heading>Get a legal pronouncement of death</Heading>
                <Text>And do other things too.</Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    )
  }

  didFinishPersonalizingGuide = () => (
    this.state.selState && this.state.selReligion && this.state.selRecency && this.props.currentUser
  )

  handleInputChange = (stateKey: string) => e => {
    this.setState({...this.state, [stateKey]: e.target.value})
  }

  handleOptionClick = (stateKey: string, stateValue: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [stateKey]: stateValue})
  }

  handleSignupSubmit = (signup) => async (e) => {
    e.preventDefault()
    try {
      await signup(this.state.inputEmail, this.state.inputPassword)
    } catch (err) {
      alert(`Error signing up: ${err.message}`)
    }
  }

  handleStateInputChange = (e) => {
    this.setState({...this.state, stateInput: e.target.value})
  }

  handleSubmit = (toStateKey: string, fromStateKey: string) => (e) => {
    e.preventDefault()
    const value = this.state[fromStateKey]
    this.setState({...this.state, [toStateKey]: value})
    window.localStorage.setItem(`guide:${toStateKey}`, value)
  }
}

export default props => (
  <AuthContext.Consumer>
    {({currentUser, signup}) => <GuidePage {...props} currentUser={currentUser} signup={signup} />}
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
  }`
  
  const loadFromLocalStorageInBrowser = (stateKey: string) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(`guide:${stateKey}`)
    } else {
      return ''
    }
  }

  const NavContainer = Box.extend`
    box-shadow: 0px 0px 15px #bbb;
  `