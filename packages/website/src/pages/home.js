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
  background: url(${logoImage.src}) no-repeat;
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
          <h2>Coronavirus update</h2>
          <p>Dear riders,</p>
          <p>
            With great sadness and with heavy hearts Peckham CC will no longer be running Saturday Social rides or
            arranging group events and rides until further notice. Given recent news and due to the rapid spread of the
            Coronavirus around London we can’t continue to organise activities and meet ups until the risk of
            inadvertent transmission to our riders’ friends, family and loved ones has passed. This decision is
            following advice from British Cycling and the government and it reflects the decision of most other local
            clubs. The current advice is that cyclists can go out on their own (unless self-isolating) and for your
            mental and physical health we encourage you to continue with exercise if you can - please do so in a
            sensible manner taking care to follow hygiene guidelines, avoiding social contact and please ride safely.
          </p>
          <p>
            Please also note that Rat Race is still open and plan to stay open until any point they are legally
            required to close. They are keen to keep everyone on their bikes so please continue to support them and pop
            round for any mechanical needs.
          </p>
          <p>
            For the latest updates on when we'll ride again, <Link to='/mailing-list'>sign up to our mailing list</Link>.
          </p>
          <p>
            We hope our riders, friends, family and loved ones remain healthy - look out for each other and your
            neighbours within our Peckham community and beyond.
          </p>
          <p>United we Roll!</p>
          <p>Jemma, Leo, Katherine and Jonny</p>
        </Panel>
        <LinkPanel background={membershipBackground.src}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
        <LinkPanel background={equipmentBackground.src}>
          <Link to='/equipment'>Equipment</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default HomePage
