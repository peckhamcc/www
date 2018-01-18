import React, { Component } from 'react'

class EquipmentPage extends Component {
  render () {
    return (
      <article>
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
      </article>
    )
  }
}

export default EquipmentPage
