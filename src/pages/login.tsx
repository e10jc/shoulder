import * as React from 'react'
import {Box, Button, Label, Input} from 'rebass'

import {AuthContext} from '../layouts/index'

interface State {
  inputEmail: string,
  inputPassword: string,
}

class Login extends React.Component<{}, State> {
  state = {
    inputEmail: '',
    inputPassword: '',
  }

  render () {
    return (
      <Box>
        <AuthContext.Consumer>
          {({currentUser, login}) => (
            !currentUser ? (
              <form onSubmit={this.handleSubmit(login)}>
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

  handleSubmit = (login) => async (e) => {
    e.preventDefault()
    try {
      await login(this.state.inputEmail, this.state.inputPassword, true)
    } catch (err) {
      alert(`Error signing up: ${err.message}`)
    }
  }
}

export default Login