import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  setUserName
} from '../../store/actions'
import {
  Input
} from '../forms'

class SaveNameForm extends Component {
  state = {
    editing: false,
    name: ''
  }

  componentDidMount () {
    this.setState({
      name: this.props.user.name || '',
      editing: !this.props.user.name
    })
  }

  handleNameChange = (event) => {
    this.props.setUserName(event.target.value.trim())

    this.setState({
      name: event.target.value
    })
  }

  render () {
    if (!this.props.token) {
      return null
    }

    return (
      <>
        <Input
          type='text'
          placeholder='Enter your name'
          required
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        {
          this.state.name ? null : (
            <p>Please enter your name so the other riders in your group will know who you are</p>
          )
        }
      </>
    )
  }
}

SaveNameForm.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ roulette: { token }, user }) => ({
  token,
  user
})

const mapDispatchToProps = {
  setUserName
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveNameForm)
