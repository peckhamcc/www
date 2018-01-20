import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

// aliasing to match use of styled-components with npm
//const keyframes = styled.keyframes;
//const styled = styled.default;

const transition = keyframes`
  16.665%, 33.33% {opacity: 1;}
  49.995%, 100% {opacity: 0;}`;

const Container = styled.ul`
  list-style: none;
  overflow: hidden;
  height: 80vh;
  padding: 0;
  margin: 0;
`;

const Slide = styled.li`
  position: absolute;
  opacity: 0;
  height: 80vh;
  width: 100%;
  background-image: ${props => 'url("' + props.background + '")' };
  background-size: cover;
  background-position: center top;
  animation: 18s ${transition} linear infinite 0s; /* 6 second per slide, 3 slides, total 18s */
  animation-delay: ${props => props.order * 6 + 's'}; /* use the order prop as a multiplicator to have each slide appear/disappear successively */
`;

const SlideShowWrapper = ({ slides }) => {
  return (
    <Container>
        {slides.map((background, key) => <Slide background={background} key={key} order={key} />)}
    </Container>
  )
}

export default SlideShowWrapper
