import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseButton from 'react-icons/lib/fa/close'
import { light, dark, darkAccent } from '../colours'
import { ModalBlocker } from './panels'

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -${props => props.height / 2}px;
  margin-left: -${props => props.width / 2}px;
  height: ${props => props.height}px;
  max-height: 100vh;
  width: ${props => props.width}px;
  max-width: 100vw;
  background-color: ${darkAccent};
  color: ${light};
  padding: 0;
  border: 1px solid ${light};
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

const ModalCloseButton = styled.div`
  
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

  render () {
    return (
      <ModalBlocker onClick={this.props.onClose}>
        <ModalWrapper width={this.props.width} height={this.props.height}>
          <ModalHeader>
            <ModalTitle>{this.props.title}</ModalTitle>
            <ModalCloseButton>
              <CloseButton onClick={this.props.onClose} />
            </ModalCloseButton>
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
