import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel
} from '../components/panels'
import styled from 'styled-components'
import StoreToken from '../components/ride-roulette/store-token'
import LogInForm from '../components/ride-roulette/log-in-form'
import SaveNameForm from '../components/ride-roulette/save-name-form'
import Rides from '../components/ride-roulette/rides'
import pccLogo from '../../assets/pcc-logo-round.png'

const CenteredPanel = styled(Panel)`
  max-width: 376px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding-top: 20px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

class RideRoulettePage extends Component {
  render () {
    return (
      <PageWrapper>
        <StoreToken />
        <CenteredPanel>
          <img src={pccLogo.src} width='300' height='300' />
          <h2>Ride Roulette</h2>
          <LogInForm />
          <SaveNameForm />
          <Rides />
        </CenteredPanel>
      </PageWrapper>
    )
  }
}

export default RideRoulettePage
