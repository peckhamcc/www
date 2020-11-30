import React, {
  Component
} from 'react'
import {
  PageWrapper
} from '../components/panels'
import StoreToken from '../components/ride-roulette/store-token'
import LogInForm from '../components/ride-roulette/log-in-form'
import Rides from '../components/ride-roulette/rides'

class RideRoulettePage extends Component {
  render () {
    return (
      <PageWrapper>
        <StoreToken />
        <LogInForm />
        <Rides />
      </PageWrapper>
    )
  }
}

export default RideRoulettePage
