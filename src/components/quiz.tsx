import * as React from 'react'
import {Box, Button, ButtonOutline, Flex, Heading, Input, Label, Text} from 'rebass'

import {get as getFromLocalStorage, set as setInLocalStorage} from '../helpers/local-storage'
import {GRecency, GReligion} from '../pages/guide'
import {AuthContext} from '../layouts'

interface Props {
  currentUser: object,
  recencies: GArray<GRecency>,
  religions: GArray<GReligion>,
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

class Quiz extends React.Component<Props, State> {
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
    const {currentUser, recencies: {edges: recencies}, religions: {edges: religions}} = this.props
    const {recencyInput, religionInput, selRecency, selReligion, selState} = this.state

    return (
      <Box>
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
              <form onSubmit={this.handleSignupSubmit()}>
                <Label>Email</Label>
                <Input onChange={this.handleInputChange('inputEmail')} type='email' required value={this.state.inputEmail} />
                <Label>Password</Label>
                <Input onChange={this.handleInputChange('inputPassword')} type='password' required value={this.state.inputPassword} />
                <Button type='submit'>Submit</Button>
              </form>
            </Box>
          )}
        </Box>
      </Box>
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
    setInLocalStorage(createLocalStorageKey(toStateKey), value)
  }
}

export default props => (
  <AuthContext.Consumer>
    {({currentUser, signup}) => <Quiz {...props} currentUser={currentUser} signup={signup} />}
  </AuthContext.Consumer>
)

export const createLocalStorageKey = (key: string) => `guide:${key}`

export const selRecencyKey = createLocalStorageKey('selRecency')
export const selReligionKey = createLocalStorageKey('selReligion')
export const selStateKey = createLocalStorageKey('selState')

export const didFinishQuiz = currentUser => !!(
  currentUser && getFromLocalStorage(selStateKey) && getFromLocalStorage(selReligionKey) && getFromLocalStorage(selRecencyKey)
)