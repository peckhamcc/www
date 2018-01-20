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

const Footer = styled.footer`
  clear: both;
  padding: 50px 30px 10px 30px;
  font-size: 12px;
  color: ${darkAccent};
  background-color: ${darkLowlight};
`

const SocialLink = styled.a`
  color: ${darkAccent};
  font-size: 18px;
  margin-left: 10px;

  &:hover {
    color: ${light}
  }
`

const FooterWrapper = () => {
  return (
    <Footer>
      <FlexContainerCentered>
        <FlexContentLeft>
          &copy; Peckham Cycle Club {new Date().getFullYear()}
        </FlexContentLeft>

        <FlexContentCenter>
          United we <Comment text='Sausage' /> roll
        </FlexContentCenter>

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
