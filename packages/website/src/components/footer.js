import React from 'react'
import styled from 'styled-components'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import InstagramIcon from 'react-icons/lib/fa/instagram'
import { dark, darkAccent, darkLowlight, light } from '../colours'
import {
  FlexContainerCentered,
  FlexContentLeft,
  FlexContentCenter,
  FlexContentRight
} from './panels'
import Comment from './comment'
import { spacing } from '../units'

const Footer = styled.footer`
  clear: both;
  padding: ${spacing(3)} ${spacing(2)} ${spacing(1)} ${spacing(2)};
  font-size: 16px;
  color: ${darkAccent};
  background-color: ${darkLowlight};

  @media (max-width: 640px) {
    font-size: 12px;
  }
`

const SocialLink = styled.a`
  color: ${darkAccent};
  font-size: 18px;
  margin-left: 10px;

  &:link {
    color: ${darkAccent};
  }

  &:hover {
    color: ${light}
  }
`

const FooterWrapper = () => {
  return (
    <Footer>
      <FlexContainerCentered>
        <FlexContentLeft>
        United we <Comment text='Sausage' /> roll
        </FlexContentLeft>

        <FlexContentRight>
          <SocialLink href="https://facebook.com/PeckhamCC"><FacebookIcon /></SocialLink>
          <SocialLink href="https://instagram.com/PeckhamCC"><InstagramIcon /></SocialLink>
          <SocialLink href="https://twitter.com/PeckhamCC"><TwitterIcon /></SocialLink>
        </FlexContentRight>
      </FlexContainerCentered>
    </Footer>
  )
}

export default FooterWrapper
