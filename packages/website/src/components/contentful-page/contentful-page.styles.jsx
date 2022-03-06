import logoImage from '../../../assets/pcc-logo@2x.png'
import styled from 'styled-components'

export const Logo = styled.h1`
  margin: 0;
  padding: 250px 0 0 0;
  height: 0;
  overflow: hidden;
  background: url(${logoImage}) no-repeat;
  background-position: center;
  background-size: contain;

  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 450;
`
