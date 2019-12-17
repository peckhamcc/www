import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class ReactComment extends Component {
  static propTypes = {
    text: PropTypes.string,
    trim: PropTypes.bool
  }

  static defaultProps = {
    trim: true
  }

  componentDidMount () {
    const el = ReactDOM.findDOMNode(this)
    ReactDOM.unmountComponentAtNode(el)
    el.outerHTML = this.createComment()
  }

  createComment () {
    let text = this.props.text

    if (this.props.trim) {
      text = text.trim()
    }

    return `<!-- ${text} -->`
  }

  render () {
    return <div />
  }
}

export default ReactComment
