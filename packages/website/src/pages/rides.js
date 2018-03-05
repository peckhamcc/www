import React, { Component } from 'react'
import { Break, PageWrapper, Panel } from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import styled from 'styled-components'

const Hero = styled.div`
  background-image: url(${ridesBackground.src});
  background-size: cover;
  background-position: center top;
  height: 60vh;
`

class RidesPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero />
        <Panel>
          <h2>Club Rides</h2>
          <p>All rides leave Peckham Library at 8am or 9am depending on the time of year.</p>
          <p>Details of weekend rides are usually posted to Facebook and Twitter towards the end of the week.</p>
          <p>First time riders are more than welcome but if you are thinking of joining us for the first time, please get in touch first so we know to look out for you!</p>
          <h3>Social Spin</h3>
          <p>There is a club social ride on most Saturdays throughout the year and is the ideal introduction to riding with Peckham CC.</p>
          <p>It's a non-drop ride, meaning we wait at the tops of climbs and everyone rides back together.</p>
          <p>The 'standard' route is about 60km long and takes about three hours.  At the 30km point we usually decide whether to go further, sometimes splitting the group if people have to be back early.</p>
          <h3>Ladies Ride</h3>
          <p>Once a month there is a women-only ride aimed at</p>
          <h3>Training Rides</h3>
          <p>Depending on the time of year and people's training goals, there my be a faster group on Saturdays and sometimes Sundays too.</p>
          <p>These rides can be up to 200km in length.</p>
        </Panel>
        <Panel>
          <h2>Equipment checklist</h2>
          <p>It's important to have the right equipment for a ride, you'll be faster, happier and more comfortable if you are well prepared!</p>
          <ol>
            <li>Helmet - saftey first</li>
            <li>Road Bike - it doesn't have to be expensive but it should have drop handlebars and gears</li>
            <li>Pedals - clip-in (or clipless) pedals are a must. They are more efficient than flats and safter than toe-clips</li>
            <li>Spare inner tubes - take two spares out just in case</li>
            <li>Tyre levers - much easier to remove a flat tyre with these</li>
            <li>Pump or CO<sub>2</sub> cannister - soft tyres means you will burn more energy</li>
            <li>Multi-tool - these are usually small and have the basic tools for fixing common bike problems</li>
            <li>Lights - when riding in darker months it's good to see and be seen</li>
            <li>Water bottle - it's important to stay hydrated especially in warmer weather</li>
            <li>Food - energy bars, gels, bananas, etc to keep your energy up. Count on eating something every 20kms or so - small and often is key.</li>
            <li>Clothing - having the right clothing on when riding makes the experience all the more enjoyable.  Light weight rain jackets are a good all round choice.</li>
            <li>Mobile phone - in case of emergency.  Selfie emergencies.</li>
            <li>Cash - in case of coffee stops. Cards are good too but some places in the countryside only take cash.</li>
          </ol>
        </Panel>
      </PageWrapper>
    )
  }
}

export default RidesPage
