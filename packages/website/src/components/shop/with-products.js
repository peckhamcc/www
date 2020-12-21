import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Spinner
} from '../panels'
import config from '../../config'
import {
  loadProducts,
  setProducts
} from '../../store/actions'

class WithProducts extends Component {
  async componentDidMount () {
    if (Object.keys(this.props.categories).length) {
      return
    }

    this.props.loadProducts()

    try {
      const response = await global.fetch(config.lambda.shopProductsGet, {
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
    return Object.keys(this.props.categories).length ? (
      <>
        {this.props.children}
      </>
    ) : (
      <>
        <Spinner />
      </>
    )
  }
}

const mapStateToProps = ({ shop: { categories } }) => ({
  categories
})

const mapDispatchToProps = {
  loadProducts,
  setProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(WithProducts)
