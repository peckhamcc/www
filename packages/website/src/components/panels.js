import styled from 'styled-components'
import stripesImage from '../../assets/stripes.png'
import {
  panelLevel1Background,
  panelLevel1Header,
  panelLevel1Text,
  panelLevel2Background,
  panelLevel2Header,
  panelLevel2Text,
  light,
  lightAccent,
  dark,
  darkAccent,
  errorText,
  pccLightBlue,
  pccDarkBlue,
  pccRed,
  pccYellow
} from '../colours'
import {
  spacing,
  MAX_PAGE_WIDTH
} from '../units'

export const ResultTable = styled.table`
  width: 100%;
  margin: ${spacing(1)} 0;

  td {
    padding: 5px;
  }
`
export const ResultHeader = styled.th`
  background: ${darkAccent};
  padding: 5px;
`
export const ResultRow = styled.tr`

`
export const ResultOddRow = styled.tr`
  background: ${lightAccent};
`

export const ResultAvatar = styled.img`
  width: 50px;
  height: 50px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`

export const ResultRiderName = styled.p`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  padding: 0;
`

export const ResultIcon = styled.img`
  height: 40px;
  width: 40px;
`

export const FlexContainerCentered = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: ${props => parseInt(100 / props.children.length)}vw;
  }
`

export const FlexContent = styled.div`

`

export const FlexContentLeft = styled(FlexContent)`
  text-align: left;
`

export const FlexContentCenter = styled(FlexContent)`
  text-align: center;
`

export const FlexContentRight = styled(FlexContent)`
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
  margin: 60px auto 0 auto;
  max-width: ${MAX_PAGE_WIDTH};
`

export const Panel = styled.div`
  background-color: ${panelLevel1Background};
  border-radius: 2px;
  color: ${panelLevel1Text};
  padding: 1px 20px 20px 20px;
  margin: ${spacing(1)};
  font-size: 16px;
  line-height: 1.6;

  h2, h3, h4 {
    color: ${panelLevel1Header};
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
    margin: ${spacing(1)} 0 ${spacing(1)} 0;
  }

  li {
    margin: ${spacing(0.5)} 0;
  }
`

export const InnerPanel = styled(Panel)`
  background-color: ${panelLevel2Background};
  color: ${panelLevel2Text};
  margin: ${spacing(2)} 0 0 0;

  h2, h3, h4 {
    color: ${panelLevel2Header};
  }
`

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

  @media (max-width: 940px) {
    padding: 3px ${spacing(2)};
    font-size: 22px;
  }
`

export const TextButton = styled(Button)`
  border: none;
  padding: 0;

  @media (max-width: 940px) {
    padding: 0;
  }
`

export const SmallTextButton = styled(TextButton)`
  font-size: 12px;

  @media (max-width: 940px) {
    font-size: 16px;
  }
`

export const ModalBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: scroll;
`
export const LinkPanel = styled.div`
  width: calc(50% - 28px);
  display: inline-block;
  margin: 0 0 20px 20px;
  position: relative;

  @media (max-width: 640px) {
    width: calc(100vw - 40px);
  }

  a {
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 80px 0;
    font-size: 48px;
    color: ${darkAccent};
  }

  a:hover {
    color: ${errorText}
  }

  &::after {
    content: "";
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center center;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`

export const Hero = styled.div`
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center top;
  height: 60vh;

  @media (max-width: 940px) {
    height: 40vh;
  }

  @media (max-width: 640px) {
    height: 20vh;
  }
`

export const ShortHero = styled(Hero)`
  height: 20vh;

  @media (max-width: 940px) {
    height: 10vh;
  }

  @media (max-width: 640px) {
    height: 5vh;
  }
`

export const SelectableOption = styled.div`
  border-radius: 2px;
  border: 1px solid ${light};
  background-color: ${props => props.selected ? lightAccent : 'transparent'};
  cursor: pointer;
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 3px ${spacing(1)};
  min-width: 40px;
  text-align: center;

  &:active {
    background-color: ${dark};
  }

  &:hover {
    background-color: ${lightAccent};
  }

  @media (max-width: 940px) {
    padding: 3px ${spacing(2)};
    font-size: 22px;
  }
`

export const Spinner = styled.div`
  height: 100px;
  width: 100px;
  margin: auto;
  border: 6px solid;
  border-top-color: ${pccLightBlue};
  border-right-color: ${pccDarkBlue};
  border-bottom-color: ${pccRed};
  border-left-color: ${pccYellow};

  border-radius: 50%;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const SmallSpinner = styled(Spinner)`
  height: 39px;
  width: 39px;

  @media (max-width: 940px) {
    height: 33px;
    width: 33px;
  }
`

export const CentredPanel = styled(Panel)`
  max-width: 376px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding-top: 20px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`
