import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'
import backgroundImage1 from '../../assets/bg-1.jpg'
import backgroundImage2 from '../../assets/bg-2.jpg'
import backgroundImage3 from '../../assets/bg-3.jpg'
import backgroundImage4 from '../../assets/bg-4.jpg'
import backgroundImage5 from '../../assets/bg-5.jpg'
import backgroundImage6 from '../../assets/bg-6.jpg'
import backgroundImage7 from '../../assets/bg-7.jpg'
import backgroundImage8 from '../../assets/bg-8.jpg'
import backgroundImage9 from '../../assets/bg-9.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import logoImage from '../../assets/pcc-logo@2x.png'
import SlideShow from '../components/slide-show'
import {
  PageWrapper,
  Panel,
  LinkPanel
} from '../components/panels'

const Logo = styled.h1`
  margin: 0;
  padding: 250px 0 0 0;
  height: 0;
  overflow: hidden;
  background: url(${logoImage}) no-repeat;
  background-position: center;
  background-size: contain;

  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 450;
`

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

class HomePage extends Component {
  render () {
    return (
      <PageWrapper>
        <Logo>Peckham Cycle Club</Logo>
        <SlideShow slides={shuffle([
          backgroundImage1,
          backgroundImage2,
          backgroundImage3,
          backgroundImage4,
          backgroundImage5,
          backgroundImage6,
          backgroundImage7,
          backgroundImage8,
          backgroundImage9
        ])}
        />
        {/* <Panel>
          <h2>Upcoming rides</h2>
          <p>There are rides every Saturday and sometimes Sundays too.</p>
          <p>The Saturday Social Spin is an ideal introduction to the club - it's 60-80kms at a beginner friendly speed, leaving Peckham Library at 8am in the summer and 8:30am in the winter.</p>
          <p>Other rides are organised on an ad-hoc basis and the speed/distance depends on who's riding and what they are training for.</p>
          <p>Full details are posted on Facebook and Twitter towards the end of the week when we know what the weather is going to do, please check those pages for more information.</p>
        </Panel> */}
        <Panel>
          <h2>March 13th: Covid-19 Update</h2>
          <p>We are looking forward to returning to group riding soon! Our Saturday morning social rides will be back on 3rd April, in line with the latest <a href='https://www.britishcycling.org.uk/about/article/20210309-about-bc-news-British-Cycling-update--The-Way-Forward-0'>British Cycling Guidance</a> which allows group rides after 29th March.</p>
          <p>If you’ve not ridden with the Club before have a look at our <Link to='/rides'>Rides page</Link> for information about How to join our rides.</p>
          <p>For the latest updates on this and more please sign up to our <Link to='/mailing-list'>mailing list</Link>.</p>
          <p>United we Roll!</p>
        </Panel>
        <LinkPanel background={membershipBackground}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
        <LinkPanel background={equipmentBackground}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default HomePage
