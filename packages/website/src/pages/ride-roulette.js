import React, {
  Component
} from 'react'
import {
  PageWrapper
} from '../components/panels'
import LogInForm from '../components/ride-roulette/log-in-form'

class RideRoulettePage extends Component {
  render () {
    return (
      <PageWrapper>
        <LogInForm />
      </PageWrapper>
    )
  }
}

export default RideRoulettePage
