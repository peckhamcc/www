import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb } from '../components/panels'
import styled from 'styled-components'
import ChevronLeftIcon from 'react-icons/lib/fa/chevron-left'
import ChevronRightIcon from 'react-icons/lib/fa/chevron-right'
import { light, lightAccent, dark } from '../colours'
import Modal from './modal'
import { spacing } from '../units'

const Thumbnails = styled.div`
  user-select: none;
`

const Thumbnail = styled.div`
  cursor: pointer;
  display: inline-block;
  border: 1px solid ${(props) => props.selected ? light : lightAccent};
  margin: 0 5px 0 0;
  background: ${(props) => props.selected ? lightAccent : 'transparent'}
`

const ImageWrapper = styled.div`
  display: flex;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(1)};
  user-select: none;
`

const ImageNav = styled.div`
  flex-grow: 0;
  width: ${spacing(4)};
  font-size: ${spacing(4)};
  cursor: pointer;

  &:hover {
    background: ${lightAccent};
  }

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const ProductImage = styled.div`
  flex-grow: 1;
`

const ThumbnailImage = ({ image, onClick, selected }) => {
  return (
    <Thumbnail onClick={onClick} selected={selected}>
      <img srcSet={image.srcSet} src={image.src} width={100} />
    </Thumbnail>
  )
}

class ImageViewer extends Component {
  state = {
    index: 0
  }

  nextImage = () => {
    this.setState(s => {
      let index = s.index - 1

      if (index < 0) {
        index = this.props.images.length - 1
      }

      return {
        index
      }
    })
  }

  previousImage = () => {
    this.setState(s => {
      let index = s.index + 1

      if (index === this.props.images.length) {
        index = 0
      }

      return {
        index
      }
    })
  }

  viewImage = (index) => {
    this.setState({index})
  }

  render () {
    const { images } = this.props
    const mainImage = images[this.state.index]

    return (
      <div>
        <ImageWrapper>
          {images.length > 1 && (
            <ImageNav onClick={this.previousImage}>
              <div>
                <ChevronLeftIcon />
              </div>
            </ImageNav>
          )}

          <ProductImage>
            <img srcSet={mainImage.srcSet} src={mainImage.src} width={500} />
          </ProductImage>

          {images.length > 1 && (
            <ImageNav onClick={this.nextImage}>
              <div>
                <ChevronRightIcon />
              </div>
            </ImageNav>
          )}
        </ImageWrapper>

        {images.length > 1 && (
          <Thumbnails>
            {images.map((image, index) => <ThumbnailImage image={image} key={index} onClick={() => this.viewImage(index)} selected={index === this.state.index} />)}
          </Thumbnails>
        )}
      </div>
    )
  }
}

ImageViewer.images = {
  product: PropTypes.array.isRequired
}

export default ImageViewer
