import React, {
  Component
} from 'react'
import {
  PageWrapper,
  Panel,
  InnerPanel,
  Hero
} from '../components/panels'
import routesBackground from '../../assets/routes-bg.jpg'
import styled from 'styled-components'
import {
  FaRegMap
} from 'react-icons/fa'
import {
  light
} from '../colours'

const Sharing = styled.p`
  a {
    text-decoration: none;
    color: ${light};
  }

  a:hover {
    text-decoration: underline;
  }
`
class RoutesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={routesBackground.src} />
        <Panel>
          <InnerPanel>
            <h2>Club Routes</h2>
            <p>
              Peckham CC has a variety of routes that we often draw from, ranging from 50-60km social rides
              all the way up to hilly epics and seaside jaunts.
            </p>
            <p>
              Feel free to grab routes from our RideWithGPS collection, and download GPX files to your phone or bike
              computer to help you navigate on the go.
            </p>
            <Sharing>
              <a href='https://ridewithgps.com/collections/15759?privacy_code=WobhC2AqkEQxBQvK'><FaRegMap /> View on RideWithGPS</a>
            </Sharing>
          </InnerPanel>
          <InnerPanel>
            <h2>Gravel/CX Routes</h2>
            <p>
              We've got a budding gravel/cx/muddy off road scene too! Our rides are often organised ad-hoc - keep an eye
              on the facebook event or ask on our WhatsApp for more details about upcoming rides. The rides are
              typically at a social pace, and often feature route changes on the fly and larking around in the woods.
              Our gravel rides are welcome to anyone with chunky tyres who doesn't mind getting a bit muddy.
            </p>
            <p>
              Feel free to grab routes from our RideWithGPS collection, and download GPX files to your phone or bike
              computer to help you navigate on the go.
            </p>
            <Sharing>
              <a href='https://ridewithgps.com/collections/15762?privacy_code=Fb0nGIH25lNd9yzG'><FaRegMap /> View on RideWithGPS</a>
            </Sharing>
          </InnerPanel>
        </Panel>
      </PageWrapper>
    )
  }
}

export default RoutesPage
