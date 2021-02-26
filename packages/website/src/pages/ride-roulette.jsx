import React, {
  Component
} from 'react'
import {
  PageWrapper,
  CentredPanel
} from '../components/panels'
import WithUser from '../components/with-user'
import styled from 'styled-components'
import Rides from '../components/ride-roulette/rides'
import rouletteLogo from '../../assets/roulette/logo.png'

const RideRouletteHeader = styled.h2`
  text-align: center;
`

class RideRoulettePage extends Component {
  render () {
    return (
      <WithUser redirect='/ride-roulette'>
        <PageWrapper>
          <CentredPanel>
            <img src={rouletteLogo} width='300' height='300' />
            <RideRouletteHeader>Ride Roulette</RideRouletteHeader>
            <Rides />
          </CentredPanel>
        </PageWrapper>
      </WithUser>
    )
  }
}

export default RideRoulettePage
