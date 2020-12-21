import React, {
  Component
} from 'react'
import {
  PageWrapper,
  CentredPanel
} from '../components/panels'
import WithUser from '../components/with-user'
import WithUserName from '../components/with-user-name'
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
        <WithUserName>
          <PageWrapper>
            <CentredPanel>
              <img src={rouletteLogo.src} width='300' height='300' />
              <RideRouletteHeader>Ride Roulette</RideRouletteHeader>
              <Rides />
            </CentredPanel>
          </PageWrapper>
        </WithUserName>
      </WithUser>
    )
  }
}

export default RideRoulettePage
