import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import backgroundImage1 from '../../assets/bg-1.jpg'
import backgroundImage2 from '../../assets/bg-2.jpg'
import backgroundImage3 from '../../assets/bg-3.jpg'
import backgroundImage4 from '../../assets/bg-4.jpg'
import backgroundImage5 from '../../assets/bg-5.jpg'
import backgroundImage6 from '../../assets/bg-6.jpg'
import stripesImage from '../../assets/stripes.png'
import logoImage from '../../assets/pcc-logo-white@2x.png'
import SlideShow from '../components/slide-show'
import { light, lightAccent, main } from '../colours'
import { Break, PageWrapper, Panel } from '../components/panels'

const Logo = styled.h1`
  margin: 0 0 0 -25vw;
  padding: 373px 0 0 0;
  width: 50vw;
  height: 0;
  overflow: hidden;
  background: url(${logoImage.src}) no-repeat;
  background-size: 579px 373px;
  background-position: center;
  background-size: contain;

  position: absolute;
  top: 240px;
  left: 50%;
  z-index: 100;
`

const HomePagePanel = Panel.extend`
  width: 46vw;
  float: left;
`

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
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
          backgroundImage6
        ])} />
        <Break />
        <HomePagePanel>
          <h2>About</h2>
          <p>We are a group of cyclists, meeting on weekends to ride together and catchup over coffee and climbs.</p>
          <p>We love meeting new and exciting people and hope that you will join us some day soon!</p>
        </HomePagePanel>
        <HomePagePanel>
          <h2>Upcoming rides</h2>
          <p>There are rides every Saturday and sometimes Sundays too.</p>
          <p>The Saturday Social Spin is an ideal introduction to the club - it's 60-80kms at a beginner friendly speed, leaving Peckham Library at 8am in the summer and 8:30am in the winter.</p>
          <p>Other rides are organised on an ad-hoc basis and the speed/distance depends on who's riding and what they are training for.</p>
          <p>Full details are posted on Facebook and Twitter towards the end of the week when we know what the weather is going to do, please check those pages for more information.</p>
        </HomePagePanel>
      </PageWrapper>
    )
  }
}

export default HomePage
