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
  Button
} from '../components/panels'
import shopBackground from '../../assets/shop-bg.jpg'
import capFront from '../../assets/shop/cap-front.png'
import headsetCapFront from '../../assets/shop/headset-cap.png'
import hoodieFront from '../../assets/shop/hoodie-front.png'
import tshirtFront from '../../assets/shop/tshirt-front.png'
import musette from '../../assets/shop/musette.png'
import socksWinter from '../../assets/shop/socks-winter-side.png'
import socksSummer from '../../assets/shop/socks-summer-side.png'
import bidon from '../../assets/shop/bidon.png'

class KitPage extends Component {
  render () {
    return (
      <PageWrapper>
        <Hero background={shopBackground.src} />
        <Panel>
          <h2>Club kit</h2>
          <p>Peckham Cycle Club kit is provided by Pro Vision clothing and is available exclusively to <Link to='/membership'>Friends of PCC</Link></p>
          <p>Please visit the kit portal to place an order:</p>
          <p>
            <Button>
              <a href='https://portal.provisionclothing.com/'>
                Pro Vision kit portal
              </a>
            </Button>
          </p>
          <p>Samples of jerseys &amp; bibs are available to try on before ordering, please <Link to='/contact'>contact us</Link> to arrange a time.</p>
          <p>Everyting is made to order - we aim to put orders in every couple of months and manufacturing takes about six weeks.</p>
          <p>To avoid disappointment, it's generally best to order kit a season in advance.  Ordering a summer jersey in July will almost certainly see you wearing it for the first time in a late September rainstorm, mostly because the factory closes for the whole of August.</p>
          <p>Please <Link to='/contact'>contact us</Link> if you are a Friend but don't know the log in details for the kit portal.</p>
          <h3>Other kit</h3>
          <p><a href='https://ratracecycles.com/'>Rat Race Cycles</a> in Nunhead holds stock of small items such as caps, bidons, musettes etc.</p>
          <p>
            <img srcSet={capFront.srcSet} src={capFront.src} width={200} />
            <img srcSet={bidon.srcSet} src={bidon.src} width={200} />
            <img srcSet={musette.srcSet} src={musette.src} width={200} />
            <img srcSet={hoodieFront.srcSet} src={hoodieFront.src} width={200} />
            <img srcSet={tshirtFront.srcSet} src={tshirtFront.src} width={200} />
            <img srcSet={headsetCapFront.srcSet} src={headsetCapFront.src} width={200} />
            <img srcSet={socksWinter.srcSet} src={socksWinter.src} width={200} />
            <img srcSet={socksSummer.srcSet} src={socksSummer.src} width={200} />
          </p>
          <p>Stocks of these are replenished as and when they run out and designs change with each order - please <Link to='/contact'>contact us</Link> if you'd like to know if anything specific is in stock.</p>
        </Panel>
      </PageWrapper>
    )
  }
}

export default KitPage
