import React from 'react'
import styled from 'styled-components'
import {
  FaTwitter,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa'
import {
  pccLightBlue,
  panelLevel3Text
} from '../colours'
import {
  FlexContainerCentered,
  FlexContentLeft,
  FlexContentRight
} from './panels'
import { spacing } from '../units'

const Footer = styled.footer`
  clear: both;
  padding: ${spacing(3)} ${spacing(2)};
  font-size: 16px;
  color: ${panelLevel3Text};
  background-color: #2d2d2d;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`

const SocialLink = styled.a`
  color: ${panelLevel3Text};
  font-size: 25px;
  margin-left: 20px;

  &:link {
    color: ${panelLevel3Text};
  }

  &:hover {
    color: ${pccLightBlue}
  }
`

const FooterWrapper = () => {
  return (
    <Footer>
      <FlexContainerCentered>
        <FlexContentLeft>
          United we roll
        </FlexContentLeft>

        <FlexContentRight>
          <SocialLink href='https://facebook.com/PeckhamCC'><FaFacebook /></SocialLink>
          <SocialLink href='https://instagram.com/PeckhamCC'><FaInstagram /></SocialLink>
          <SocialLink href='https://twitter.com/PeckhamCC'><FaTwitter /></SocialLink>
        </FlexContentRight>
      </FlexContainerCentered>
    </Footer>
  )
}

export default FooterWrapper
