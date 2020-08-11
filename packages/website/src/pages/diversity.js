import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import ethosBackground from '../../assets/ethos-bg.png'
import membershipBackground from '../../assets/membership-bg.jpg'
import diversityBackground from '../../assets/diversity-bg.jpg'
import diversityReport from '../../assets/diversity-report-action-plan-jul-2020.pdf'

class DiversityPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={diversityBackground.src} />
        <Panel>
          <h2>Diversity and Inclusion</h2>

          <p>
            At Peckham CC we seek to be an inclusive and welcoming club as set out in our
            our <Link to='/ethos'>ethos and core ideals</Link>. Whilst we are exceptionally proud of our reputation as
            a friendly and approachable club, we also recognise that the lack of diversity in cycling is a major issue
            and that our club does not adequately reflect our local community. We want to address this and, working with
            our members, the club committee have been reflecting on what actions we need to take to improve our
            diversity and inclusion.
          </p>
          <p>
            Our first step has been to look at our local context, the available guidance and research on diversity in
            cycling, key themes and barriers to inclusion and possible actions we can take. We have brought this
            research and thinking together in
            our <a href={diversityReport}>Peckham CC Diversity &amp; Inclusion Report</a>. This report is just our first
            step and the club is now working on a diversity and inclusion action plan which will be co-created with our
            members to ensure our actions reflect our local need and context.
          </p>
          <p>
            We think it's important to be transparent about this work so we will update this page with our latest
            actions.
          </p>

          <p>Actions July-September 2020:</p>
          <ul>
            <li>To share this diversity and inclusion report with the club to get initial feedback.</li>
            <li>
              To share this report with other local SE cycling clubs with an aim to prompt discussion and share good
              practice.
            </li>
            <li>
              Convene a meeting of local club representatives to discuss diversity in our clubs and to create a joint
              letter to British Cycling to ask them to take a more transparent and strategic approach to improving
              diversity in cycling and supporting clubs to improve their diversity and inclusion.
            </li>
            <li>Review and improve our diverse imagery on our website and social media channels.</li>
            <li>
              Add a blog page to the PCC website to provide a space for club members to talk about their experiences of
              cycling, to share real-life stories and inspire people to join our club.
            </li>
          </ul>

          <p>
            If you want to get in touch about our diversity and inclusion work in the club please get in touch via our
            <Link to='/contact'>contact form</Link>.
          </p>
        </Panel>
        <LinkPanel background={ethosBackground.src}>
          <Link to='/ethos'>Ethos</Link>
        </LinkPanel>
        <LinkPanel background={membershipBackground.src}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default DiversityPage
