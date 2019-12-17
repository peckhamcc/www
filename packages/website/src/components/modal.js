import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FaTimes
} from 'react-icons/fa'
import { light, dark, darkAccent } from '../colours'
import { ModalBlocker } from './panels'

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${darkAccent};
  color: ${light};
  padding: 0;
  border: 1px solid ${light};

  @media (max-width: 940px) {
    width: 80vw;
  }

  @media (max-width: 640px) {
    width: 90vw;
  }
`

const ModalHeader = styled.div`
  display: flex;
  background-color: ${dark};
  padding: 10px;
  border-bottom: 1px solid ${light};
`

const ModalTitle = styled.div`
  flex-grow: 1;
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
