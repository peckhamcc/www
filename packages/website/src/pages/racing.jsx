import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import racingBackground from '../../assets/racing-bg.jpg'

class RacingPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={racingBackground} />
        <Panel>
          <h2>Racing</h2>
          <p>A number of our club members compete regularly in the local cyclocross circuit and we've also started taking part in the LVCC Tuesday 10s time trials at the Lee Valley VeloPark and have even entered the odd criterium.</p>
          <p>Keeping it South, Herne Hill velodrome is our local track and it offers not only a great 'cross circuit but also training sessions for various disiplines.</p>
          <p>Most of the organising for the club takes place in our WhatsApp group - <Link to='/contact'>get in touch</Link> if you'd like to be added.</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default RacingPage
