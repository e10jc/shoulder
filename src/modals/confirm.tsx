import * as qs from 'qs'
import * as React from 'react'
import * as Modal from 'react-modal'
import {Box} from 'rebass'

import {AuthContext} from '../layouts/index'

interface Props {
  confirm: any,
  currentUser: object,
}

interface State {
  couldNotConfirm: boolean,
  didConfirm: boolean,
  shouldDisplay: boolean,
}

class ConfirmModal extends React.Component<Props, State> {
  state = {
    couldNotConfirm: false,
    didConfirm: false,
    shouldDisplay: false,
  }

  componentDidMount () {
    this.detectConfirmationFromUrl()
  }

  render () {
    return (
      <Modal isOpen={this.state.shouldDisplay} onRequestClose={this.handleDone}>
        {!this.state.couldNotConfirm && !this.state.didConfirm ? (
          <Box>Confirming...</Box>
        ) : (this.state.didConfirm ? (
          <Box>You are confirmed!</Box>
        ) : (
          <Box>Unable to confirm</Box>
        ))}
      </Modal>
    )
  }

  detectConfirmationFromUrl = async () => {
    const {confirmation_token: token} = qs.parse(window.location.hash)
    if (token) {
      this.setState({...this.state, shouldDisplay: true})
      try {
        await this.props.confirm(token, true)
        this.setState({...this.state, didConfirm: true})
      } catch (err) {
        this.setState({...this.state, couldNotConfirm: true})
      }
    }
  }

  handleDone = () => {
    this.setState({...this.state, shouldDisplay: false})
  }
}

export default props => (
  <AuthContext.Consumer>
    {({confirm, currentUser}) => <ConfirmModal confirm={confirm} currentUser={currentUser} />}
  </AuthContext.Consumer>
)
