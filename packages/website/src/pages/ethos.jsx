import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import ethosBackground from '../../assets/ethos-bg.png'
import leadingBackground from '../../assets/leading-bg.jpg'
import diversityBackground from '../../assets/diversity-bg.jpg'

class EthosPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={ethosBackground} />
        <Panel>
          <h2>Our ethos and core ideals</h2>

          <h3>United we roll</h3>
          <p>
            We are a social cycling club that is inclusive and welcoming. We ride safely and sensibly and look out for
            each other on the bike and off. Unlike many clubs, our weekly club ride is open to everyone - if you ride
            with us you’re a member. To contribute to the activities of the club, come on trips and buy club kit you
            can become a <Link to='/membership'>friend of Peckham CC</Link>, our voluntary membership scheme.
          </p>

          <h3>We are proud to be Peckham</h3>
          <p>
            We respect our local area and our local community. We seek to support local businesses (for example, Rat
            Race Cycles and Aneto, our post ride coffee shop) and promote the club to the community by being visible
            (very easy in our amazing club kit), friendly and being responsible ambassadors for the club.
          </p>

          <h3>We ride respectfully and sensibly</h3>
          <p>
            We respect each other and other road users by riding safely at all times following the rules of the road and
            good group riding etiquette. We pass on signals down the group, we don’t overlap wheels, we ride no more
            than two abreast and move to single file to let cars pass, we don’t drop riders and we always listen to our
            ride leader.
          </p>

          <h3>We flourish because of our members</h3>
          <p>
            Everything we do is only possible because of club members volunteering their time and energy. A committee is
            elected each year to lead the club but it’s the combined effort of all the volunteers that makes the club
            grow and flourish.
          </p>
        </Panel>
        <LinkPanel background={diversityBackground}>
          <Link to='/diversity'>Diversity and Inclusion</Link>
        </LinkPanel>
        <LinkPanel background={leadingBackground}>
          <Link to='/Leading'>Leading</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default EthosPage
