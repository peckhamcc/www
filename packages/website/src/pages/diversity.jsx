import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper, Panel, Hero, LinkPanel } from '../components/panels'
import ethosBackground from '../../assets/ethos-bg.png'
import membershipBackground from '../../assets/membership-bg.jpg'
import diversityBackground from '../../assets/diversity-bg.jpg'

class DiversityPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={diversityBackground} />
        <Panel>
          <h2>Diversity and Inclusion</h2>
          <p>At Peckham CC we seek to be an inclusive and welcoming club as set out in our <Link to='/ethos'>ethos and core ideals</Link>. All are welcome whatever their background, ethnicity, gender identity, religious belief or sexuality.</p>
          <p>We are exceptionally proud of our reputation as a friendly and approachable club but we also recognise that the lack of diversity in cycling is a major issue and that our club does not adequately reflect our local community, particularly in terms of ethnic diversity. At Peckham CC we want to ensure we grow and develop our inclusive practice and for our membership to become even more diverse.</p>
          <h3>What are we doing?</h3>
          <p>Peckham CC was created to be a social and welcoming cycling club. Paid membership has never been, and will never be, compulsory to ride with us and be a part of the club. Based on this our Saturday ‘social rides' are the basis of all we do and we aim to make those rides as approachable and accessible as we can. This is the foundation of our work to be inclusive but we have been working to try and recognise barriers for different people and how we can overcome them.</p>
          <p>Our first step in this work has been to look at our local context, the available guidance and research on diversity in cycling, key themes and barriers to inclusion and possible actions we can take. We brought this research and thinking together in our <a href='https://drive.google.com/file/d/16gKxWn5SzYtLrFqU1Lcw4RkmhsAE-pZk/view?usp=sharing'>Peckham CC Diversity &amp; Inclusion Report 2020</a>. This report was our first step in understanding the challenges and thinking about our next actions.</p>
          <p>We are now working on a range of actions based on our report and action plan. We think it's important to be transparent about this work so we try to keep this webpage up to date with new information.</p>
          <h3>Key actions over 2020-2021</h3>
          <ul>
            <li>Run regular rides for women and non-binary people</li>
            <li>Raised awareness with members about diversity and inclusion in cycling, in particular ethnic diversity and inclusion, LGBTQIA+ inclusion and how we can be allies</li>
            <li>Updated our <Link to='/rides'>Ride with us</Link> page to try and make it as clear as possible for new riders and we always speak to new people so they know what to expect and we can see how best to support them</li>
            <li>Engaging with the <a href='https://www.britishcycling.org.uk/regions/southeast?c=EN'>British Cycling South East Region</a> to share ideas and support their work on diversity and inclusion</li>
            <li>Ensuring we turn up to BC SE regional meetings to champion diversity and inclusion matters. One of our members is now also a board member for the region</li>
          </ul>
          <h3>Diversity in Cycling Resource Bank</h3>
          <p>As we have come across great resources, cyclists and groups promoting and supporting inclusion in cycling we have added these to our <a href='https://docs.google.com/spreadsheets/d/13_RWXXVqUmTIeY-xgaD5875St72yil1FFzOuPjb6dOk/edit?usp=sharing'>Diversity in Cycling Resource Bank</a>.</p>
          <p>We have found it really helpful and informative to connect with these amazing resources and people and we hope others may find it useful too.</p>
          <p>If you want to suggest something to be added to the bank just <a href='https://docs.google.com/forms/d/e/1FAIpQLSeZ1NJAlgnrxoavlhuTcJiKLRHav16WR9XwbZ7SF_QTKu5JOg/viewform?usp=sf_link'>fill out this form</a>.</p>
          <h3>South East London Diversity &amp; Inclusion Network</h3>
          <p>In August 2020 we convened a virtual meeting with representatives from other local cycling and triathlon clubs. The aim of this meeting was to discuss diversity in our clubs, the barriers to inclusion we each face and to share ideas and good practice for improving Diversity &amp; Inclusion.</p>
          <p>The group agreed that continued collaboration across our clubs would be positive for all of us so we created a SE London D&amp;I Network to support this.</p>
          <p>In line with our commitment to transparency you are welcome to view the <a href='https://drive.google.com/file/d/1xScN04irhgRKGCkt7xlwCjmKU819664n/view?usp=sharing'>network meeting notes</a>.</p>
          <h3>Get involved</h3>
          <p>If you're already a member of Peckham CC and want to get involved in our diversity and inclusion work, or just ask a question or share an idea, then we'd love to hear from you. You can find and message our D&amp;I Lead, Jemma Adams, on Slack.</p>
          <p>All events, rides and initiatives related to diversity and inclusion will be shared on Slack in the <a href='https://peckhamcc.slack.com/archives/C01J8SG7YKB'>#announcements</a> channel and the <a href='https://peckhamcc.slack.com/archives/C01HFELEAPR'>#chat</a> channel. </p>
          <p>If you're not a member but want to get in touch about our diversity and inclusion work, share ideas with us or join the SE London D&amp;I Network then please get in touch via our <Link to='/contact'>contact form</Link>.</p>
        </Panel>
        <LinkPanel background={ethosBackground}>
          <Link to='/ethos'>Ethos</Link>
        </LinkPanel>
        <LinkPanel background={membershipBackground}>
          <Link to='/membership'>Membership</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default DiversityPage
