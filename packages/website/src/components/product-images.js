import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'
import {
  light,
  lightAccent
} from '../colours'
import {
  spacing
} from '../units'

const Thumbnails = styled.div`
  user-select: none;
`

const Thumbnail = styled.div`
  cursor: pointer;
  display: inline-block;
  border: 1px solid ${(props) => props.selected ? light : lightAccent};
  margin: 0 5px 20px 0;
  background: ${(props) => props.selected ? lightAccent : 'transparent'}
`

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  margin: auto;
  display: block;
`

const ImageWrapper = styled.div`
  display: flex;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(1)};
  user-select: none;

  @media (max-width: 940px) {
    margin-right: 0;
  }
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

  @media (max-width: 940px) {
    font-size: ${spacing(3)};
    width: ${spacing(3)};
  }

  @media (max-width: 640px) {
    font-size: ${spacing(2)};
    width: ${spacing(2)};
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

  handleNextImage = () => {
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

  handlePreviousImage = () => {
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
    this.setState({ index })
  }

  render () {
    const { images } = this.props
    const mainImage = images[this.state.index]

    return (
      <div>
        <ImageWrapper>
          {images.length > 1 && (
            <ImageNav onClick={this.handlePreviousImage}>
              <div>
                <FaChevronLeft />
              </div>
            </ImageNav>
          )}

          <ProductImage>
            <Image srcSet={mainImage.srcSet} src={mainImage.src} />
          </ProductImage>

          {images.length > 1 && (
            <ImageNav onClick={this.handleNextImage}>
              <div>
                <FaChevronRight />
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
