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

export const ITEM_IMAGES = {
  accessories: [
    capFrontImage
  ],
  'bib-shorts-and-tights': [
    bibsFrontImage
  ],
  jerseys: [
    ssJerseyFrontImage
  ],
  outerwear: [
    giletFrontImage
  ],
  'skin-suits': [
    speedSuitFrontImage
  ],
  casualwear: [
    hoodieBlkFrontImage
  ],

  'musette-2019': [
    musetteImage
  ],
  'white-socks-2019': [
    socksSummerSideImage,
    socksSummerTopImage
  ],
  'black-socks-2019': [
    socksWinterSideImage,
    socksWinterTopImage
  ],
  'white-cap-2019': [
    capWhiteFrontImage,
    capWhiteSidesImage
  ],
  'black-cap-2019': [
    capFrontImage,
    capSidesImage
  ],
  'summer-sleeves-2022': [
    armWarmersImage
  ],
  'winter-arm-warmers-2022': [
    armWarmersImage
  ],
  'neck-warmer-2022': [
    multiTubeImage
  ],
  'club-bib-shorts-2022': [
    bibsFrontImage
  ],
  'pro-bib-shorts-2022': [
    bibsFrontImage
  ],
  'club-3-4-bib-shorts-2022': [
    bibs34FrontImage
  ],
  'club-bib-tights-2022': [
    bibsTightsFrontImage
  ],
  'club-jersey-2022': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'pro-jersey-2022': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'lightweight-gilet-2022': [
    giletFrontImage,
    giletRearImage
  ],
  'club-gilet-2022': [
    giletFrontImage,
    giletRearImage
  ],
  'winter-pro-jersey-2022': [
    lsJerseyFrontImage
  ],
  'winter-club-jersey-2022': [
    lsJerseyFrontImage
  ],
  'rain-jacket-2022': [
    winterJacketFrontImage
  ],
  'winter-jacket-2022': [
    winterJacketFrontImage
  ],
  'club-skin-suit-2022': [
    speedSuitFrontImage,
    speedSuitRearImage
  ],
  'road-skin-suit-2022': [
    speedSuitFrontImage,
    speedSuitRearImage
  ],
  'track-skin-suit-2022': [
    speedSuitFrontImage,
    speedSuitRearImage
  ],
  'bidon-2019': [
    bidonImage
  ],
  'hoodie-2021': {
    BLK: [
      hoodieBlkFrontImage,
      hoodieBlkBackImage
    ]
  },
  'zip-hoodie-2021': {
    BLK: [
      zipHoodieBlkFrontImage,
      zipHoodieBlkBackImage
    ]
  },
  't-shirt-2021': {
    BLK: [
      tshirtBlkFrontImage,
      tshirtBlkBackImage
    ],
    WHI: [
      tshirtWhiFrontImage,
      tshirtWhiBackImage
    ]
  },
  'ls-t-shirt-2021': {
    BLK: [
      lsTshirtBlkFrontImage,
      lsTshirtBlkBackImage
    ],
    WHI: [
      lsTshirtWhiFrontImage,
      lsTshirtWhiBackImage
    ]
  },
  'bday-t-shirt-2021': {
    BLK: [
      bdayTshirtBlkFrontImage,
      bdayTshirtBlkBackImage
    ],
    WHI: [
      bdayTshirtWhiFrontImage,
      bdayTshirtWhiBackImage
    ]
  },
  'royal-mail-shipping': [
    royalMailShippingImage
  ],
  'dpd-shipping': [
    dpdShippingImage
  ]
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
    <img src={findImage(item.slug, colour)} {...attrs} />
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
