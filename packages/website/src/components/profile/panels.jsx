import styled from 'styled-components'
import {
  InnerPanel,
  Button
} from '../panels'
import {
  lightAccent
} from '../../colours'
import {
  spacing
} from '../../units'

export const TabHolder = styled.div``

export const Tab = styled(Button)`
  border: none;
  background-color: ${props => props.selected ? lightAccent : 'transparent'};
  padding: ${spacing(0.5)} ${spacing(1)};
  margin-bottom: 0;
`

export const TabContent = styled(InnerPanel)`
  margin-top: 0;
`
