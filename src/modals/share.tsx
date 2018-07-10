import * as React from 'react'
import * as Modal from 'react-modal'
import {Box} from 'rebass'

interface Props {
  isOpen: boolean,
  handleClose: () => any,
}

class ShareModal extends React.Component<Props> {
  render () {
    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.props.handleClose}>
        Share modal
      </Modal>
    )
  }
}

export default ShareModal
