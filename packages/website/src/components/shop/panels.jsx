import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  light
} from '../../colours'
import {
  InnerPanel
} from '../panels'
import {
  spacing
} from '../../units'

import clubLogo from '../../../assets/pcc-avatar.png'
import armWarmersImage from '../../../assets/shop/arm-warmers.png'
import bibsFrontImage from '../../../assets/shop/bibs-front.png'
import bibs34FrontImage from '../../../assets/shop/34-bibs-front.png'
import bibsTightsFrontImage from '../../../assets/shop/winter-tights-front.png'
import capFrontImage from '../../../assets/shop/cap-front.png'
import capSidesImage from '../../../assets/shop/cap-sides.png'
import capWhiteFrontImage from '../../../assets/shop/cap-white-front.png'
import capWhiteSidesImage from '../../../assets/shop/cap-white-sides.png'
import giletFrontImage from '../../../assets/shop/gilet-front.png'
import giletRearImage from '../../../assets/shop/gilet-rear.png'
import lsJerseyFrontImage from '../../../assets/shop/ls-jersey-front.png'
import ssJerseyFrontImage from '../../../assets/shop/ss-jersey-front.png'
import ssJerseyRearImage from '../../../assets/shop/ss-jersey-rear.png'
import winterJacketFrontImage from '../../../assets/shop/winter-jacket-front.png'
import socksSummerSideImage from '../../../assets/shop/socks-summer-side.png'
import socksSummerTopImage from '../../../assets/shop/socks-summer-top.png'
import socksWinterSideImage from '../../../assets/shop/socks-winter-side.png'
import socksWinterTopImage from '../../../assets/shop/socks-winter-top.png'
import multiTubeImage from '../../../assets/shop/multi-tube.png'
// import headsetCapImage from '../../../assets/shop/headset-cap.png'
import bidonImage from '../../../assets/shop/bidon.png'
import tshirtBlkFrontImage from '../../../assets/shop/t-shirt-2021-blk-front.png'
import tshirtBlkBackImage from '../../../assets/shop/t-shirt-2021-blk-back.png'
import tshirtWhiFrontImage from '../../../assets/shop/t-shirt-2021-whi-front.png'
import tshirtWhiBackImage from '../../../assets/shop/t-shirt-2021-whi-back.png'
import lsTshirtBlkFrontImage from '../../../assets/shop/ls-t-shirt-2021-blk-front.png'
import lsTshirtBlkBackImage from '../../../assets/shop/ls-t-shirt-2021-blk-back.png'
import lsTshirtWhiFrontImage from '../../../assets/shop/ls-t-shirt-2021-whi-front.png'
import lsTshirtWhiBackImage from '../../../assets/shop/ls-t-shirt-2021-whi-back.png'
import hoodieBlkFrontImage from '../../../assets/shop/hoodie-2021-blk-front.png'
import hoodieBlkBackImage from '../../../assets/shop/hoodie-2021-blk-back.png'
import zipHoodieBlkFrontImage from '../../../assets/shop/zip-hoodie-2021-blk-front.png'
import zipHoodieBlkBackImage from '../../../assets/shop/zip-hoodie-2021-blk-back.png'
import musetteImage from '../../../assets/shop/musette.png'
import speedSuitFrontImage from '../../../assets/shop/skin-suit-front.png'
import speedSuitRearImage from '../../../assets/shop/skin-suit-rear.png'
import royalMailShippingImage from '../../../assets/shop/royal-mail.png'
import dpdShippingImage from '../../../assets/shop/amazon.png'
import bdayTshirtWhiFrontImage from '../../../assets/shop/bday-t-shirt-2021-whi-front.png'
import bdayTshirtWhiBackImage from '../../../assets/shop/bday-t-shirt-2021-whi-back.png'
import bdayTshirtBlkFrontImage from '../../../assets/shop/bday-t-shirt-2021-blk-front.png'
import bdayTshirtBlkBackImage from '../../../assets/shop/bday-t-shirt-2021-blk-back.png'
import valuablesPouch from '../../../assets/shop/valuables-pouch.png'
import spinnFabric from '../../../assets/shop/material-spinn.jpg'
import stripesFabric from '../../../assets/shop/material-stripes.jpg'
import razorFabric from '../../../assets/shop/material-razor.jpg'
import veranoFabric from '../../../assets/shop/material-verano.jpg'
import carbonFabric from '../../../assets/shop/material-carbon.jpg'
import andorraFabric from '../../../assets/shop/material-andorra.jpg'
import tempsFabric from '../../../assets/shop/material-temps.jpg'
import microfibreFabric from '../../../assets/shop/material-microfibre.jpg'
import missionFlowFabric from '../../../assets/shop/material-mission-flow.jpg'
import eventFabric from '../../../assets/shop/material-event.png'
import lycraPowerFabric from '../../../assets/shop/material-lycra-power.jpg'
import goffratoFabric from '../../../assets/shop/material-goffrato.jpg'
import veranoFlexFabric from '../../../assets/shop/material-verano-flex.png'
import roubaixFabric from '../../../assets/shop/material-roubaix.jpg'
import revolutionalFabric from '../../../assets/shop/material-revolutional.jpg'
import briosFabric from '../../../assets/shop/material-brios.jpg'

export const ITEM_IMAGES = {
  accessories: [{
    src: capFrontImage
  }],
  'bib-shorts-and-tights': [{
    src: bibsFrontImage
  }],
  jerseys: [{
    src: ssJerseyFrontImage
  }],
  outerwear: [{
    src: giletFrontImage
  }],
  'skin-suits': [{
    src: speedSuitFrontImage
  }],
  casualwear: [{
    src: hoodieBlkFrontImage
  }],

  'musette-2019': [{
    src: musetteImage
  }],
  'white-socks-2019': [{
    src: socksSummerSideImage
  }, {
    src: socksSummerTopImage
  }],
  'black-socks-2019': [{
    src: socksWinterSideImage
  }, {
    src: socksWinterTopImage
  }],
  'white-cap-2019': [{
    src: capWhiteFrontImage
  }, {
    src: capWhiteSidesImage
  }],
  'black-cap-2019': [{
    src: capFrontImage
  }, {
    src: capSidesImage
  }],
  'summer-sleeves-2022': [{
    src: armWarmersImage,
    text: 'Summer sleeves'
  }, {
    src: lycraPowerFabric,
    text: 'Lightweight lycra fabric'
  }],
  'winter-arm-warmers-2022': [{
    src: armWarmersImage,
    text: 'Winter arm warmers'
  }, {
    src: roubaixFabric,
    text: 'Insulated roubaix fabric'
  }],
  'neck-warmer-2022': [{
    src: multiTubeImage
  }],
  'club-bib-shorts-2022': [{
    src: bibsFrontImage,
    text: 'Bib shorts'
  }, {
    src: lycraPowerFabric,
    text: 'Lycra fabric'
  }],
  'pro-bib-shorts-2022': [{
    src: bibsFrontImage,
    text: 'Pro bib shorts'
  }, {
    src: goffratoFabric,
    text: 'Speed textured lycra'
  }, {
    src: veranoFlexFabric,
    text: 'Lightweight summer fabric'
  }, {
    src: roubaixFabric,
    text: 'Insulated roubaix fabric'
  }],
  'club-3-4-bib-shorts-2022': [{
    src: bibs34FrontImage,
    text: '3/4 bibs'
  }, {
    src: lycraPowerFabric,
    text: 'Lycra fabric'
  }, {
    src: roubaixFabric,
    text: 'Insulated roubaix fabric'
  }],
  'club-bib-tights-2022': [{
    src: bibsTightsFrontImage,
    text: 'Winter tights'
  }, {
    src: roubaixFabric,
    text: 'Insulated roubaix fabric'
  }],
  'club-jersey-2022': [{
    src: ssJerseyFrontImage,
    text: 'Jersey front'
  }, {
    src: ssJerseyRearImage,
    text: 'Jersey rear'
  }, {
    src: spinnFabric,
    text: 'Woven fabric option'
  }, {
    src: razorFabric,
    text: 'Smooth fabric option (on body)'
  }, {
    src: stripesFabric,
    text: 'Smooth fabric option (on arms)'
  }, {
    src: valuablesPouch,
    text: 'Optional valuables pouch'
  }],
  'pro-jersey-2022': [{
    src: ssJerseyFrontImage,
    text: 'Jersey front'
  }, {
    src: ssJerseyRearImage,
    text: 'Jersey rear'
  }, {
    src: razorFabric,
    text: 'Smooth fabric option'
  }, {
    src: veranoFabric,
    text: 'Lightweight fabric option'
  }, {
    src: carbonFabric,
    text: 'Woven fabric option'
  }, {
    src: valuablesPouch,
    text: 'Optional valuables pouch'
  }],
  'lightweight-gilet-2022': [{
    src: giletFrontImage,
    text: 'Gilet front'
  }, {
    src: giletRearImage,
    text: 'Gilet rear'
  }, {
    src: microfibreFabric,
    text: 'Lightweight microfibre fabric on chest and shoulders'
  }],
  'club-gilet-2022': [{
    src: giletFrontImage,
    text: 'Gilet front'
  }, {
    src: giletRearImage,
    text: 'Gilet rear'
  }, {
    src: missionFlowFabric,
    text: 'Three-layer wind/waterproof membrane fabric'
  }],
  'winter-pro-jersey-2022': [{
    src: lsJerseyFrontImage,
    text: 'Pro winter jersey front'
  }, {
    src: tempsFabric,
    text: 'Lightweight roubaix-style jersey material'
  }],
  'winter-club-jersey-2022': [{
    src: lsJerseyFrontImage,
    text: 'Winter jersey front'
  }, {
    src: andorraFabric,
    text: 'Warm roubaix-style jersey material'
  }],
  'rain-jacket-2022': [{
    src: winterJacketFrontImage,
    text: 'Rain jacket front'
  }, {
    src: eventFabric,
    text: 'Wind and waterproof fabric'
  }],
  'winter-jacket-2022': [{
    src: winterJacketFrontImage,
    text: 'Winter jacket front'
  }, {
    src: missionFlowFabric,
    text: 'Three-layer wind/waterproof membrane fabric'
  }],
  'club-skin-suit-2022': [{
    src: speedSuitFrontImage,
    text: 'Skin suit front'
  }, {
    src: speedSuitRearImage,
    text: 'Skin suit rear'
  }, {
    src: lycraPowerFabric,
    text: 'Lycra fabric'
  }, {
    src: revolutionalFabric,
    text: 'Lightweight fabric'
  }],
  'road-skin-suit-2022': [{
    src: speedSuitFrontImage,
    text: 'Skin suit front'
  }, {
    src: speedSuitRearImage,
    text: 'Skin suit rear'
  }, {
    src: briosFabric,
    text: 'Lycra fabric'
  }, {
    src: veranoFlexFabric,
    text: 'Lightweight fabric'
  }],
  'track-skin-suit-2022': [{
    src: speedSuitFrontImage,
    text: 'Skin suit front'
  }, {
    src: speedSuitRearImage,
    text: 'Skin suit rear'
  }],
  'bidon-2019': [{
    src: bidonImage
  }],
  'hoodie-2021': {
    BLK: [{
      src: hoodieBlkFrontImage
    }, {
      src: hoodieBlkBackImage
    }]
  },
  'zip-hoodie-2021': {
    BLK: [{
      src: zipHoodieBlkFrontImage
    }, {
      src: zipHoodieBlkBackImage
    }]
  },
  't-shirt-2021': {
    BLK: [{
      src: tshirtBlkFrontImage
    }, {
      src: tshirtBlkBackImage
    }],
    WHI: [{
      src: tshirtWhiFrontImage
    }, {
      src: tshirtWhiBackImage
    }]
  },
  'ls-t-shirt-2021': {
    BLK: [{
      src: lsTshirtBlkFrontImage
    }, {
      src: lsTshirtBlkBackImage
    }],
    WHI: [{
      src: lsTshirtWhiFrontImage
    }, {
      src: lsTshirtWhiBackImage
    }]
  },
  'bday-t-shirt-2021': {
    BLK: [{
      src: bdayTshirtBlkFrontImage
    }, {
      src: bdayTshirtBlkBackImage
    }],
    WHI: [{
      src: bdayTshirtWhiFrontImage
    }, {
      src: bdayTshirtWhiBackImage
    }]
  },
  'royal-mail-shipping': [{
    src: royalMailShippingImage
  }],
  'dpd-shipping': [{
    src: dpdShippingImage
  }]
}

const ShopPanel = styled(InnerPanel)`
  width: 300px;
  display: inline-block;
  padding: 0;
  margin: ${spacing(1)} ${spacing(1)} 0 0;
  text-align: left;

  h4 {
    padding: ${spacing(0.5)} ${spacing(1)} 0 ${spacing(1)};
    margin: 0;
  }

  h5 {
    padding: 0 ${spacing(1)} 0 ${spacing(1)};
    margin: 0;
    font-size: 16px;
  }

  img {
    width: 280px;
    margin: 0 auto ${spacing(1)} auto;
    display: block;
  }

  a {
    color: ${light};
    text-decoration: none;
  }
`

const findImage = (slug, colour) => {
  let img = ITEM_IMAGES[slug]

  if (!img) {
    console.warn('No image found for', slug)
    return clubLogo
  }

  if (colour) {
    img = img[colour]
  }

  if (Array.isArray(img)) {
    return img[0]
  }

  // item has multiple colour options
  return img[Object.keys(img)[0]][0]
}

export const ItemImage = ({ item, colour, ...attrs }) => {
  return (
    <img src={findImage(item.slug, colour).src} {...attrs} />
  )
}

export const ShopCategoryPanel = ({ item }) => {
  const { slug, name } = item

  return (
    <ShopPanel>
      <h4>
        <Link to={`/shop/${slug}`} data-section={slug}>{name}</Link>
      </h4>
      <Link to={`/shop/${slug}`}>
        <ItemImage item={item} width={300} />
      </Link>
    </ShopPanel>
  )
}

export const ShopItemPanel = ({ item }) => {
  const { slug, name, prices } = item

  // choose the lowest price
  const price = Object.values(prices).reduce((acc, curr) => {
    if (curr.amount < acc.amount) {
      return curr
    }

    return acc
  }, Object.values(prices)[0])

  return (
    <ShopPanel>
      <h4>
        <Link to={`/shop/${slug}`} data-section={slug}>{name}</Link>
      </h4>
      <h5><Price price={price.amount} /></h5>
      <Link to={`/shop/${slug}`}>
        <ItemImage item={item} width={300} />
      </Link>
    </ShopPanel>
  )
}

export const BreadCrumbList = styled.ul`
  padding: ${spacing(1)} 0;
  margin: 0;
  list-style: none;

  li {
    display: inline-block;
    margin: 0 5px 0 0;

    a {
      color: ${light};
    }
  }
`

export const Breadcrumb = ({ section, product }) => {
  const links = [
    <Link to='/shop' key='shop'>Shop</Link>
  ]

  if (product) {
    links.push(
      <Link to={`/shop/${section.slug}`} key='slug'>{section.name}</Link>,
      product.name
    )
  } else {
    links.push(
      section.name
    )
  }

  return (
    <BreadCrumbList>
      {links.map((link, index) => <li key={index}>{link} {index < links.length - 1 ? ' /' : ''}</li>)}
    </BreadCrumbList>
  )
}

export const Price = ({ price }) => {
  return (
    <span>&pound;{(price / 100).toFixed(2)}</span>
  )
}

export const Quantity = styled.span`
  display: inline-block;
  margin: 0 ${spacing(1)} 0 ${spacing(1)};
`
