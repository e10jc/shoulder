import * as React from 'react'
import {Box, Button, ButtonOutline, Heading, Input, Text} from 'rebass'

interface State {
  recencyInput: string,
  religionInput: string,
  selRecency: string,
  selReligion: string,
  selState: string,
  stateInput: string,
}

const RECENCIES = [
  ['today', 'Today'],
  ['yesterday', 'Yesterday'],
]

const RELIGIONS = [
  ['secular', 'Secular'],
]

class GuidePage extends React.Component<{}, State> {
  state = {
    recencyInput: '',
    religionInput: '',
    selRecency: '',
    selReligion: '',
    selState: '',
    stateInput: '',
  }

  render () {
    const {recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Box bg='darkGray'>
        {!selState && (
          <form onSubmit={this.handleSubmit('selState', 'stateInput')}>
            <Heading>State?</Heading>
            <Text>Laws vary.</Text>
            <Input placeholder='State' onChange={this.handleStateInputChange} />
            <Button>Submit</Button>
          </form>
        )}
        {!selReligion && (
          <form onSubmit={this.handleSubmit('selReligion', 'religionInput')}>
            <Heading>Religion?</Heading>
            <Box>
              {RELIGIONS.map(([key, name]) => (
                <ButtonOutline color='white' key={key} onClick={this.handleOptionClick('religionInput', key)}>{name}</ButtonOutline>
              ))}
            </Box>
            <Button>Submit</Button>
          </form>
        )}
        {!selRecency && (
          <form onSubmit={this.handleSubmit('selRecency', 'recencyInput')}>
            <Heading>Recency?</Heading>
            <Box>
              {RECENCIES.map(([key, name]) => (
                <ButtonOutline key={key} onClick={this.handleOptionClick('recencyInput', key)}>{name}</ButtonOutline>
              ))}
            </Box>
            <Button bg='white' color='purple'>Submit</Button>
          </form>
        )}
      </Box>
    )
  }

  handleOptionClick = (stateKey: string, stateValue: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [stateKey]: stateValue})
  }

  handleStateInputChange = (e) => {
    this.setState({...this.state, stateInput: e.target.value})
  }

  handleSubmit = (toStateKey: string, fromStateKey: string) => (e) => {
    e.preventDefault()
    this.setState({...this.state, [toStateKey]: this.state[fromStateKey]})
  }
}

export default GuidePage