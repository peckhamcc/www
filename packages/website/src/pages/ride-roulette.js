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
import rouletteLogo from '../../assets/roulette/logo.png'

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

const RideRouletteHeader = styled.h2`
  text-align: center;
`

class RideRoulettePage extends Component {
  render () {
    return (
      <PageWrapper>
        <StoreToken />
        <CenteredPanel>
          <img src={rouletteLogo.src} width='300' height='300' />
          <RideRouletteHeader>Ride Roulette</RideRouletteHeader>
          <LogInForm />
          <SaveNameForm />
          <Rides />
        </CenteredPanel>
      </PageWrapper>
    )
  }
}

export default RideRoulettePage
