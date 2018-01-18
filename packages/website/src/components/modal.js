import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from 'material-ui/Card'
import CloseButton from 'material-ui-icons/Close'

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -${props => props.height / 2}px;
  margin-left: -${props => props.width / 2}px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: #FFF;
`

const ModalHeader = styled.div`
  
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
      <Card rasied>
        <ModalWrapper width={this.props.width} height={this.props.height}>
          <ModalHeader>{this.props.title} <CloseButton onClick={this.props.onClose} /></ModalHeader>
          {this.props.children}
        </ModalWrapper>
      </Card>
    )
  }
}

export default Modal
