import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Spinner,
  Info
} from '../panels'
import config from '../../config'
import {
  loadProducts,
  setProducts
} from '../../store/actions'

class WithProducts extends Component {
  async componentDidMount () {
    if (Object.keys(this.props.sections).length) {
      return
    }

    this.props.loadProducts()

    try {
      const response = await globalThis.fetch(config.lambda.shopProductsGet, {
        method: 'GET'
      })

      if (response.status === 200) {
        this.props.setProducts(await response.json())

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const {
      sections,
      loadingProducts
    } = this.props

    if (loadingProducts) {
      return (
        <>
          <Info>Loading shop</Info>
          <Spinner />
        </>
      )
    }

    return sections.length
      ? (
        <>
          {this.props.children}
        </>
        )
      : (
        <>
          <p>There are no products available in the shop at the moment, please check back later!</p>
        </>
        )
  }
}

const mapStateToProps = ({ shop: { sections, loadingProducts } }) => ({
  sections,
  loadingProducts
})

const mapDispatchToProps = {
  loadProducts,
  setProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(WithProducts)
