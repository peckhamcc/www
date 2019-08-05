import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  Hero,
  LinkPanel
} from '../components/panels'
import ridesBackground from '../../assets/rides-bg.jpg'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'

class EquipmentPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={equipmentBackground.src} />
        <Panel>
          <h2>Equipment checklist</h2>
          <p>It's important to have the right equipment for a ride, you'll be faster, happier and more comfortable if you are well prepared!</p>
          <ol>
            <li>Helmet - saftey first</li>
            <li>Road Bike - it doesn't have to be expensive but it should have drop handlebars and gears</li>
            <li>Pedals - clip-in (or clipless) pedals and cycling specific shoes are a must - they are more efficient than flats &amp; trainers and safter than toe-clips</li>
            <li>2x spare inner tubes, tyre levers and a small pump or CO<sub>2</sub> cannister</li>
            <li>Multi-tool - these are usually small and have the basic tools for fixing common bike problems</li>
            <li>Lights - when riding in darker months it's good to see and be seen</li>
            <li>Water bottle &amp; bottle cages - it's important to stay hydrated especially in warmer weather</li>
            <li>Food - energy bars, gels, bananas, etc. Try to eat something every 20kms or so - small and often is key to keeping your energy up.</li>
            <li>Clothing - road-specific cycling jerseys and bib shorts are essential for your comfort on the bike and have pockets that can hold snacks &amp; your keys/phone etc. Light weight rain jackets or gilets are a good all round choice and can pack down into a jersey pocket when not in use.</li>
            <li>Mobile phone - in case of emergency.  Selfie emergencies.</li>
            <li>A small amount of cash. Cards are good too but some coffee stops in the countryside only take cash.</li>
            <li>Glasses - these will keep sun/wind/rain &amp; road grit out of your eyes</li>
          </ol>
        </Panel>
        <LinkPanel background={ridesBackground.src}>
          <Link to='/rides'>Rides</Link>
        </LinkPanel>
        <LinkPanel background={membershipBackground.src}>
          <Link to='/riding'>On the road</Link>
        </LinkPanel>
      </PageWrapper>
    )
  }
}

export default EquipmentPage
