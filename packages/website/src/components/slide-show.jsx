import React from 'react'
import styled, {
  keyframes
} from 'styled-components'
import {
  MAX_PAGE_WIDTH
} from '../units'
import {
  panelLevel3Background
} from '../colours'

// https://www.devtwins.com/blog/css-cross-fading-images

const VISIBLE_TIME = 2
const CROSS_FADE_TIME = 1
const ANIMATION_TIME = VISIBLE_TIME + CROSS_FADE_TIME

const fadeOut = (props) => {
  const totalAnimationDuration = ANIMATION_TIME * props.total

  return keyframes`
    0% {
      opacity: 1;
    }

    ${(VISIBLE_TIME / totalAnimationDuration) * 100}% {
      opacity: 1;
    }

    ${(1 / props.total) * 100}% {
      opacity: 0;
    }

    ${100 - ((CROSS_FADE_TIME / totalAnimationDuration) * 100)}% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  `
}

const Container = styled.ul`
  list-style: none;
  overflow: hidden;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: ${panelLevel3Background};

  ${props => {
    let children = ''

    for (let i = 0; i < props.total; i++) {
      children += `
  li:nth-of-type(${i + 1}) {
    animation-delay: ${(props.total - i - 1) * ANIMATION_TIME}s;
  }
      `
    }

    return children
  }}
`

const Slide = styled.li`
  position: absolute;
  height: 100vh;
  width: 100%;
  max-width: ${MAX_PAGE_WIDTH};
  background-image: ${props => 'url("' + props.background + '")'};
  background-size: cover;
  background-position: center top;
  animation-name: ${fadeOut};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: ${props => `${ANIMATION_TIME * props.total}s`};
`

const SlideShowWrapper = ({ slides }) => {
  return (
    <Container total={slides.length}>
      {slides.map((background, key, array) => <Slide background={background} key={key} order={key} total={array.length} />)}
    </Container>
  )
}

export default SlideShowWrapper
