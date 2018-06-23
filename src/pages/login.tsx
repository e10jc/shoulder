import * as React from 'react'
import {Box, Button, Label, Input} from 'rebass'

import {AuthContext} from '../layouts/index'

interface State {
  didLogin: boolean,
  inputEmail: string,
  inputPassword: string,
}

class Login extends React.Component<{}, State> {
  state = {
    didLogin: false,
    inputEmail: '',
    inputPassword: '',
  }

  render () {
    return (
      <Box>
        <AuthContext.Consumer>
          {(auth) => (
            !this.state.didLogin ? (
              <form onSubmit={this.handleSubmit(auth)}>
                <Label>Email</Label>
                <Input onChange={this.handleInputChange('inputEmail')} type='email' required value={this.state.inputEmail} />
                <Label>Password</Label>
                <Input onChange={this.handleInputChange('inputPassword')} type='password' required value={this.state.inputPassword} />
                <Button type='submit'>Submit</Button>
              </form>
            ) : (
              <div>You're logged in!</div>
            )
          )}
        </AuthContext.Consumer>
      </Box>
    )
  }

  handleInputChange = (stateKey: string) => e => {
    this.setState({...this.state, [stateKey]: e.target.value})
  }

  handleSubmit = (auth) => async (e) => {
    e.preventDefault()
    try {
      await auth.login(this.state.inputEmail, this.state.inputPassword, true)
      this.setState({...this.state, didLogin: true})
    } catch (err) {
      alert(`Error signing up: ${err.message}`)
    }
  }
}

export default Login