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
import socialLoopGpx from '../../assets/peckham-cc-social-loop.gpx'
import knattsValleyGpx from '../../assets/peckham-cc-knatts-valley.gpx'
import surreyHillsGpx from '../../assets/peckham-cc-surrey-hills.gpx'
import styled from 'styled-components'
import {
  FaRegMap,
  FaChevronCircleUp
} from 'react-icons/fa'
import {
  light
} from '../colours'

const Map = styled.iframe`
  width: 500px;
  height: 400px;
  margin-top: 20px;
`

const SharingList = styled.ul`
  margin: 0 0 20px 10px;
  padding: 0;
`

const Sharing = styled.li`
  list-style: none;

  a {
    text-decoration: none;
    color: ${light};
  }

  a:hover {
    text-decoration: underline;
  }
`

const routes = [{
  hash: 'the-social-loop',
  title: 'The Social Loop',
  description: 'A staple of our club Social Spin this 60km/770m route takes is a great introduction to the club.',
  gpx: socialLoopGpx,
  strava: 'https://www.strava.com/routes/23414432',
  embed: 'https://www.plotaroute.com/embedmap/1016515'
}, {
  hash: 'knatts-valley',
  title: 'Knatts Valley',
  description: 'A touch short of 90km and with 1175m of climbing this is mostly quiet country lanes.',
  gpx: knattsValleyGpx,
  strava: 'https://www.strava.com/routes/11036595',
  embed: 'https://www.plotaroute.com/embedmap/550078'
}, {
  hash: 'surrey-hills',
  title: 'Surrey Hills',
  description: 'A tougher training ride, this 145km/1800m route takes in the major climbs of the Ride London 100 mile sportive.',
  gpx: surreyHillsGpx,
  strava: 'https://www.strava.com/routes/14040879',
  embed: 'https://www.plotaroute.com/embedmap/655505'
}]

class RoutesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={routesBackground.src} />
        <Panel>
          <h2>Club Routes</h2>
          <p>These are some routes that we commonly use.</p>
          {
            routes.map((route, index) => {
              return (
                <InnerPanel key={index}>
                  <h3 id={route.hash}>{route.title}</h3>
                  <SharingList>
                    <Sharing><a href={route.gpx}><FaRegMap /> Download .gpx</a></Sharing>
                    <Sharing><a href={route.strava}><FaChevronCircleUp /> View on Strava</a></Sharing>
                  </SharingList>
                  <p>{route.description}</p>
                  <Map
                    name={route.title}
                    src={route.embed}
                    frameborder='0'
                    scrolling='no'
                    allowfullscreen
                    webkitallowfullscreen
                    mozallowfullscreen
                    oallowfullscreen
                    msallowfullscreen
                  />
                </InnerPanel>
              )
            })
          }
        </Panel>
      </PageWrapper>
    )
  }
}

export default RoutesPage
