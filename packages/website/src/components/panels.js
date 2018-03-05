import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import stripesImage from '../../assets/stripes.png'
import { main, light, lightAccent, dark } from '../colours'
import { spacing } from '../units'

export const FlexContainerCentered = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: ${props => parseInt(100 / props.children.length)}vw;
  }
`

export const FlexContent = styled.div`
  
`

export const FlexContentLeft = FlexContent.extend`
  text-align: left;
`

export const FlexContentCenter = FlexContent.extend`
  text-align: center;
`

export const FlexContentRight = FlexContent.extend`
  text-align: right;
`

export const Break = styled.hr`
  background-image: url(${stripesImage.src});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: ${spacing(0.5)};
  border: 0;
  margin: ${spacing(4)} 0 0 0;
`

export const PageWrapper = styled.article`
  /*margin-top: 71px;*/
`

export const Panel = styled.div`
  background-color: ${main};
  border-radius: 2px;
  color: ${light};
  padding: 1px 20px 20px 20px;
  margin: ${spacing(1)};
  font-size: 16px;
  line-height: 1.4;

  h2, h3, h4 {
    margin: ${spacing(1)} 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 2;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }

  p {
    margin: ${spacing(1)} 0 0 0;
  }

  li {
    margin: ${spacing(1)} 0;
  }
`

export const InnerPanel = Panel.extend`
  background-color: ${lightAccent};
  color: ${light};
  margin: ${spacing(2)} 0 0 0;
`

const ShopPanel = InnerPanel.extend`
  width: 300px;
  display: inline-block;
  padding: 0;
  margin: ${spacing(1)} ${spacing(1)} 0 0;

  h4 {
    padding: ${spacing(1)} ${spacing(1)} 0 ${spacing(1)};
    margin: 0;
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

export const ShopListItem = ({ item: { slug, title, description, images } }) => {
  return (
    <ShopPanel>
       <h4>
          <Link to={`/shop/${slug}`}>{title}</Link>
        </h4>
        <Link to={`/shop/${slug}`}>
        <img srcSet={images[0].srcSet} src={images[0].src} width={300} /></Link>
        {description && (
          <p>
            <Link to={`/shop/${slug}`}>{description}</Link>
          </p>
        )}
    </ShopPanel>
  )
}

const BreadCrumbList = styled.ul`
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

export const Breadcrumb = ({section, product}) => {
  const links = [
    <Link to='/shop'>Shop</Link>
  ]

  if (product) {
    links.push(
      <Link to={`/shop/${product.section.slug}`}>{product.section.title}</Link>,
      product.title
    )
  } else {
    links.push(
      section.title
    )
  }

  return (
    <BreadCrumbList>
      {links.map((link, index) => <li key={index}>{link} {index < links.length - 1 ? ' /' : ''}</li>)}
    </BreadCrumbList>
  )
}

export const Price = ({price}) => {
  return (
    <span>&pound;{price/100}</span>
  )
}

export const Button = styled.button`
  border-radius: 2px;
  border: 1px solid ${light};
  cursor: pointer;
  display: inline-block;
  margin: 0 5px 0 0;
  padding: 3px ${spacing(1)};
  min-width: 40px;
  text-align: center;
  color: ${light};
  background-color: transparent;
  font-size: 18px;

  &:hover {
    background-color: ${lightAccent};
  }

  &:active {
    background-color: ${dark};
  }

  &:focus {
    outline: none;
  }
`

export const TextButton = Button.extend`
  border: none;
`

export const SmallTextButton = TextButton.extend`
  font-size: 12px;
`

export const Quantity = styled.span`
  display: inline-block;
  margin: 0 ${spacing(1)} 0 ${spacing(1)};
`