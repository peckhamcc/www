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

import clubLogo from '../../../assets/pcc-avatar.png?sizes[]=300,sizes[]=500'
import armWarmersImage from '../../../assets/shop/arm-warmers.png?sizes[]=300,sizes[]=500'
import armWarmersWhiteImage from '../../../assets/shop/arm-warmers-white.png?sizes[]=300,sizes[]=500'
import bibsFrontImage from '../../../assets/shop/bibs-front.png?sizes[]=300,sizes[]=500'
import bibsRearImage from '../../../assets/shop/bibs-rear.png?sizes[]=300,sizes[]=500'
import capFrontImage from '../../../assets/shop/cap-front.png?sizes[]=300,sizes[]=500'
import capSidesImage from '../../../assets/shop/cap-sides.png?sizes[]=300,sizes[]=500'
import capWhiteFrontImage from '../../../assets/shop/cap-white-front.png?sizes[]=300,sizes[]=500'
import capWhiteSidesImage from '../../../assets/shop/cap-white-sides.png?sizes[]=300,sizes[]=500'
import giletFrontImage from '../../../assets/shop/gilet-front.png?sizes[]=300,sizes[]=500'
import giletRearImage from '../../../assets/shop/gilet-rear.png?sizes[]=300,sizes[]=500'
import giletWhiteFrontImage from '../../../assets/shop/gilet-white-front.png?sizes[]=300,sizes[]=500'
import giletWhiteRearImage from '../../../assets/shop/gilet-white-rear.png?sizes[]=300,sizes[]=500'
import lsJerseyFrontImage from '../../../assets/shop/ls-jersey-front.png?sizes[]=300,sizes[]=500'
import lsJerseyRearImage from '../../../assets/shop/ls-jersey-rear.png?sizes[]=300,sizes[]=500'
import ssJerseyFrontImage from '../../../assets/shop/ss-jersey-front.png?sizes[]=300,sizes[]=500'
import ssJerseyRearImage from '../../../assets/shop/ss-jersey-rear.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyFrontImage from '../../../assets/shop/ss-summer-jersey-front.png?sizes[]=300,sizes[]=500'
import ssSummerJerseyRearImage from '../../../assets/shop/ss-summer-jersey-rear.png?sizes[]=300,sizes[]=500'
// import ctsJerseyFrontImage from '../../../assets/shop/cts-jersey-front.png?sizes[]=300,sizes[]=500'
import winterJacketFrontImage from '../../../assets/shop/winter-jacket-front.png?sizes[]=300,sizes[]=500'
import winterJacketRearImage from '../../../assets/shop/winter-jacket-rear.png?sizes[]=300,sizes[]=500'
import winterTightsFrontImage from '../../../assets/shop/winter-tights-front.png?sizes[]=300,sizes[]=500'
import winterTightsRearImage from '../../../assets/shop/winter-tights-rear.png?sizes[]=300,sizes[]=500'
import socksSummerSideImage from '../../../assets/shop/socks-summer-side.png?sizes[]=300,sizes[]=500'
import socksSummerTopImage from '../../../assets/shop/socks-summer-top.png?sizes[]=300,sizes[]=500'
import socksWinterSideImage from '../../../assets/shop/socks-winter-side.png?sizes[]=300,sizes[]=500'
import socksWinterTopImage from '../../../assets/shop/socks-winter-top.png?sizes[]=300,sizes[]=500'
// import glovesImage from '../../../assets/shop/gloves.png?sizes[]=300,sizes[]=500'
import multiTubeImage from '../../../assets/shop/multi-tube.png?sizes[]=300,sizes[]=500'
// import headsetCapImage from '../../../assets/shop/headset-cap.png?sizes[]=300,sizes[]=500'
import bidonImage from '../../../assets/shop/bidon.png?sizes[]=300,sizes[]=500'
// import tshirtFrontImage from '../../../assets/shop/tshirt-front.png?sizes[]=300,sizes[]=500'
// import tshirtRearImage from '../../../assets/shop/tshirt-rear.png?sizes[]=300,sizes[]=500'
// import lsTshirtFrontImage from '../../../assets/shop/ls-tshirt-front.png?sizes[]=300,sizes[]=500'
// import lsTshirtRearImage from '../../../assets/shop/ls-tshirt-rear.png?sizes[]=300,sizes[]=500'
// import hoodieFrontImage from '../../../assets/shop/hoodie-front.png?sizes[]=300,sizes[]=500'
// import hoodieRearImage from '../../../assets/shop/hoodie-rear.png?sizes[]=300,sizes[]=500'
// import zipHoodieFrontImage from '../../../assets/shop/zip-hoodie-front.png?sizes[]=300,sizes[]=500'
import musetteImage from '../../../assets/shop/musette.png?sizes[]=300,sizes[]=500'
import speedSuitFrontImage from '../../../assets/shop/skin-suit-front.png?sizes[]=300,sizes[]=500'
import speedSuitRearImage from '../../../assets/shop/skin-suit-rear.png?sizes[]=300,sizes[]=500'
import triSuitFrontImage from '../../../assets/shop/tri-suit-front.png?sizes[]=300,sizes[]=500'
import triSuitRearImage from '../../../assets/shop/tri-suit-rear.png?sizes[]=300,sizes[]=500'

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
    winterJacketFrontImage
  ],
  'skin-suits': [
    speedSuitFrontImage
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
  'neck-warmer-2019': [
    multiTubeImage
  ],
  'white-arm-warmers-2019': [
    armWarmersWhiteImage
  ],
  'black-arm-warmers-2019': [
    armWarmersImage
  ],
  'winter-tights-2019': [
    winterTightsFrontImage,
    winterTightsRearImage
  ],
  'bib-shorts-2019': [
    bibsFrontImage,
    bibsRearImage
  ],
  'short-sleeved-race-jersey-2019': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'short-sleeved-summer-jersey-2019': [
    ssSummerJerseyFrontImage,
    ssSummerJerseyRearImage
  ],
  'short-sleeved-jersey-2019': [
    ssJerseyFrontImage,
    ssJerseyRearImage
  ],
  'long-sleeved-jersey-2019': [
    lsJerseyFrontImage,
    lsJerseyRearImage
  ],
  'shell-jacket-2019': [
    winterJacketFrontImage,
    winterJacketRearImage
  ],
  'gilet-2019': [
    giletFrontImage,
    giletRearImage
  ],
  'white-gilet-2019': [
    giletWhiteFrontImage,
    giletWhiteRearImage
  ],
  'tri-suit-2019': [
    triSuitFrontImage,
    triSuitRearImage
  ],
  'speed-suit-2019': [
    speedSuitFrontImage,
    speedSuitRearImage
  ],
  'bidon-2019': [
    bidonImage
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

const findImage = (slug) => {
  const img = ITEM_IMAGES[slug]

  if (!img) {
    console.warn('No image found for', slug)
    return clubLogo
  }

  return img[0]
}

export const ItemImage = ({ item, ...attrs }) => {
  return (
    <img srcSet={findImage(item.slug).srcSet} src={findImage(item.slug).src} {...attrs} />
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
  const { slug, name, price } = item

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
    <span>&pound;{price / 100}</span>
  )
}

export const Quantity = styled.span`
  display: inline-block;
  margin: 0 ${spacing(1)} 0 ${spacing(1)};
`
