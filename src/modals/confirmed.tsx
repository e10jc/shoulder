import * as queryString from 'query-string'
import * as React from 'react'
import * as Modal from 'react-modal'
import {Box, Button, ButtonOutline, Flex, Heading, Input, Text} from 'rebass'

import {AuthContext} from '../layouts/index'

interface Props {
  auth: any,
}

enum Step {
  Initial,
  IsConfirming,
  DidConfirm,
  DidNotConfirm,
  Done,
}

interface State {
  step: Step,
}

class ConfirmedModal extends React.Component<Props, State> {
  state = {
    step: Step.Initial,
  }

  componentDidMount () {
    this.detectConfirmationFromUrl()
  }

  render () {
    const {step} = this.state

    return (
      <Modal isOpen={step > Step.Initial && step < Step.Done} onRequestClose={this.handleDone}>
        {(() => {
          switch (step) {
            case Step.IsConfirming:
            return <div>Confirming...</div>
            case Step.DidConfirm:
            return <div>Confirmed!</div>
            case Step.DidNotConfirm:
            return <div>Unable to confirm</div>
          }
        })()}
      </Modal>
    )
  }

  detectConfirmationFromUrl = async () => {
    const {confirmation_token: token} = queryString.parse(window.location.hash)
    if (token) {
      this.setState({...this.state, step: Step.IsConfirming})
      try {
        await this.props.auth.confirm(token, true)
        this.setState({...this.state, step: Step.DidConfirm})
      } catch (err) {
        this.setState({...this.state, step: Step.DidNotConfirm})
      }
    }
  }

  handleDone = () => {
    this.setState({...this.state, step: Step.Done})
  }
}

export default props => (
  <AuthContext.Consumer>
    {(auth) => <ConfirmedModal auth={auth} />}
  </AuthContext.Consumer>
)
