import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FaTimes
} from 'react-icons/fa'
import {
  panelLevel3Background,
  panelLevel3Header,
  panelLevel3Text,
  panelLevel3Border,
  panelLevel3HoverBackground
} from '../colours'
import { ModalBlocker } from './panels'

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${panelLevel3Background};
  color: ${panelLevel3Text};
  padding: 0;
  border: 1px solid ${panelLevel3Border};

  @media (max-width: 940px) {
    width: 80vw;
  }

  @media (max-width: 640px) {
    width: 90vw;
  }

  button {
    color: ${panelLevel3Text};
    border: 1px solid ${panelLevel3Border};
  }

  button:hover {
    color: ${panelLevel3Text};
    border: 1px solid ${panelLevel3Border};
    background-color: ${panelLevel3HoverBackground};
  }
`

const ModalHeader = styled.div`
  display: flex;
  background-color: ${panelLevel3Background};
  padding: 10px;
  border-bottom: 1px solid ${panelLevel3Border};
`

const ModalTitle = styled.div`
  flex-grow: 1;
  color: ${panelLevel3Header}
`

const ModalFaTimes = styled.div`

`

const ModalContent = styled.div`
  padding: 10px;
`

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    onClose: PropTypes.func
  }

  handleStopPropagation (event) {
    event.stopPropagation()
  }

  render () {
    return (
      <ModalBlocker onClick={this.props.onClose}>
        <ModalWrapper width={this.props.width} height={this.props.height} onClick={this.handleStopPropagation}>
          <ModalHeader>
            <ModalTitle>{this.props.title}</ModalTitle>
            <ModalFaTimes>
              <FaTimes onClick={this.props.onClose} style={{ cursor: 'pointer' }} />
            </ModalFaTimes>
          </ModalHeader>
          <ModalContent>
            {this.props.children}
          </ModalContent>
        </ModalWrapper>
      </ModalBlocker>
    )
  }
}

export default Modal
