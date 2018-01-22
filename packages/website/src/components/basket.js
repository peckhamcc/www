import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb } from '../components/panels'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { light, lightAccent, dark } from '../colours';
import Modal from './modal';
import { addToCart } from '../store/actions'

const Table = styled.table`
`

const THead = styled.thead`
`

const TBody = styled.tbody`
`

const Row = styled.tr`
`

const Header = styled.th`
`

const Cell = styled.td`
`

class Basket extends Component {
  
  render () {
    const { cart } = this.props

    return (
      <div>
        <Table>
          <THead>
            <Row>
              <Header>Item</Header>
              <Header>Quantity</Header>
              <Header>Price</Header>
              <Header>Subtotal</Header>
            </Row>
          </THead>
          <TBody>
            {
              cart.map((item, index) => (
                <Row>
                  <Cell>{item.title}</Cell>
                  <Cell>{item.quantity}</Cell>
                  <Cell>{item.price}</Cell>
                  <Cell>{item.total}</Cell>
                </Row>
              ))
            }
          </TBody>
        </Table>
      </div>
    )
  }
}

Basket.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  addToCart: addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
