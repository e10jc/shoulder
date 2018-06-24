import * as React from 'react'
import {Box, Button, ButtonOutline, Caps, Flex, Heading, Input, Text} from 'rebass'

import Hero, {Props as HeroProps} from '../components/hero'

interface Props {
  data: {
    guideHero: HeroProps,
    personalizedGuideOptions: {
      recencies: string[],
      religions: string[],
    }
  }
}

interface State {
  recencyInput: string,
  religionInput: string,
  selRecency: string,
  selReligion: string,
  selState: string,
  stateInput: string,
}

class GuidePage extends React.Component<Props, State> {
  state = {
    recencyInput: '',
    religionInput: '',
    selRecency: loadFromLocalStorageInBrowser('selRecency'),
    selReligion: loadFromLocalStorageInBrowser('selReligion'),
    selState: loadFromLocalStorageInBrowser('selState'),
    stateInput: '',
  }

  render () {
    const {data: {guideHero, personalizedGuideOptions: {recencies, religions}}} = this.props
    const {recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Box>
        {!this.didFinishPersonalizingGuide() && (
          <Box bg='darkGray'>
            <Flex mx={-1}>
              <Box px={1} width={1 / 3}>
                <Box bg={selState ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
              <Box px={1} width={1 / 3}>
                <Box bg={selState && selReligion ? 'red' : 'white'}>&nbsp;</Box>
              </Box>
              <Box px={1} width={1 / 3}>
                <Box bg={selState && selReligion && selRecency ? 'red' : 'white'}>&nbsp;</Box>
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
                  {religions.map(religion => (
                    <ButtonOutline color='white' key={religion} onClick={this.handleOptionClick('religionInput', religion)}>{religion}</ButtonOutline>
                  ))}
                </Box>
                <Button>Submit</Button>
              </form>
            )}
            {selState && selReligion && !selRecency && (
              <form onSubmit={this.handleSubmit('selRecency', 'recencyInput')}>
                <Heading>Recency?</Heading>
                <Box>
                  {recencies.map(recency => (
                    <ButtonOutline key={recency} onClick={this.handleOptionClick('recencyInput', recency)}>{recency}</ButtonOutline>
                  ))}
                </Box>
                <Button bg='white' color='purple'>Submit</Button>
              </form>
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
    this.state.selState && this.state.selReligion && this.state.selRecency
  )

  handleOptionClick = (stateKey: string, stateValue: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [stateKey]: stateValue})
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

export default GuidePage

export const query = graphql`
  query guideQuery {
    personalizedGuideOptions: contentfulPersonalizedGuideOption (contentful_id: {eq: "6q0PFbSuRywKOMC8UKuEKI"}) {
      religions
      recencies
    }

    guideHero: contentfulHero (contentful_id: {eq: "3qaxnqaxuooqu8SESGgGMY"}) {
      title
      body {
        body
      }
      linkUrl
      linkTitle
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