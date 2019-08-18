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
import aboutBackground from '../../assets/about-bg.jpg'

class AboutPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={aboutBackground.src} />
        <Panel>
          <h2>The Club</h2>
          <p>Peckham Cycle Club was set up in 2013 by a group of Peckham residents with a shared passion for cycling.</p>
          <p>Over the years it has gone from strength to strength and has even become a <a href='https://www.britishcycling.org.uk/club/profile/8092/peckham-cycle-club'>British Cycling affiliated club</a> and a <a href='https://www.gov.uk/government/publications/community-amateur-sports-clubs-casc-registered-with-hmrc--2/o-p-q-r#p'>Community Amateur Sports Club</a>.</p>
          <p>We have weekly social rides that are open to all, monthly women-only rides, groups doing faster/longer training rides, evening sessions at the Olympic park, the odd <Link to='/racing'>Cyclocross race</Link> and even groups doing laps of Regent's Park unreasonably early in the morning a couple of times a week.</p>
          <p>As well as doing regular sportives in the UK, we've had a groups doing long sportives/training trips on the continent including to Nice, Paris Roubaix, l'Etape du Tour and the Marmotte.</p>
          <p>Most of the organising for the club takes place in our WhatsApp group - <Link to='/contact'>get in touch</Link> if you'd like to be added.</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default AboutPage
