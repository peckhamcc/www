import React from 'react'
import styled from 'styled-components'
import stripesImage from '../../assets/stripes.png'
import { main, light, lightAccent } from '../colours'

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
  background-image: url(${stripesImage});
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 10px;
  border: 0;
  margin: 0;
`

export const PageWrapper = styled.article`
  margin-top: 71px;
`

export const Panel = styled.div`
  background-color: ${main};
  border-radius: 2px;
  color: ${light};
  padding: 1px 20px 20px 20px;
  margin: 20px;
  font-size: 16px;
  line-height: 1.4;

  h2, h3, h4 {
    margin: 20px 0;
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
    margin: 10px 0 0 0;
  }

  li {
    margin: 10px 0;
  }
`

export const InnerPanel = Panel.extend`
  background-color: ${lightAccent};
  color: ${light};
  margin: 20px 0 0 0;
`