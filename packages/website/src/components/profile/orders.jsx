import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  Spinner,
  Info,
  Button
} from '../panels'
import {
  Price
} from '../shop/panels'
import {
  expiredToken,
  loadOrders,
  setOrders
} from '../../store/actions'
import {
  config
} from '@peckhamcc/config'
import {
  panelLevel2Border
} from '../../colours'
import {
  spacing
} from '../../units'
import Order from './order'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  border-bottom: 1px solid ${panelLevel2Border};
`

const TBody = styled.tbody`
`

const Row = styled.tr`

`

const Header = styled.th`
  text-align: left;
  vertical-align: top;
  padding: ${spacing(1)};
`

const Cell = styled.td`
  vertical-align: top;
  padding: ${spacing(1)};
`

function OrderList ({ orders, onShowOrder }) {
  return (
    <Table>
      <THead>
        <Row>
          <Header>Date</Header>
          <Header>Total</Header>
          <Header>Actions</Header>
        </Row>
      </THead>
      <TBody>
        {
          orders.map(order => (
            <Row key={order.id}>
              <Cell>{new Date(order.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</Cell>
              <Cell><Price price={order.amount} /></Cell>
              <Cell><Button style={{ margin: 0 }} onClick={() => onShowOrder(order)}>Order details</Button></Cell>
            </Row>
          ))
        }
      </TBody>
    </Table>
  )
}

class Orders extends Component {
  state = {
    order: null
  }

  async componentDidMount () {
    if (this.props.orders.length) {
      return
    }

    await Promise.all([
      this._loadOrders()
    ])
      .catch(err => console.error(err))
  }

  async _loadOrders () {
    this.props.loadOrders()

    try {
      const response = await globalThis.fetch(config.lambda.shopOrdersGet, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        this.props.setOrders(await response.json())

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
    }
  }

  handleShowOrder = (order) => {
    this.setState({
      order
    })
  }

  handleShowOrders = () => {
    this.setState({
      order: null
    })
  }

  render () {
    const {
      loadingOrders,
      orders
    } = this.props
    const {
      order
    } = this.state

    if (order) {
      return (
        <Order order={order} onShowOrders={this.handleShowOrders} />
      )
    }

    return (
      loadingOrders
        ? (
          <>
            <Info>Loading orders</Info>
            <Spinner />
          </>
          )
        : (
            orders.length
              ? (
                <>
                  <OrderList orders={orders} onShowOrder={this.handleShowOrder} />
                </>

                )
              : (
                <p>You have no outstanding shop orders</p>
                )
          )
    )
  }
}

const mapStateToProps = ({ session: { token }, user, shop: { loadingOrders, orders } }) => ({
  user,
  token,
  loadingOrders,
  orders
})

const mapDispatchToProps = {
  expiredToken,
  loadOrders,
  setOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
