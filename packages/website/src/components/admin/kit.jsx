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
  loadKitOrders,
  setKitOrders
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

class KitOrders extends Component {
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
    this.props.loadKitOrders()

    try {
      const response = await global.fetch(config.lambda.shopOrdersGet, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        this.props.setKitOrders(await response.json())

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
        null // <Order order={order} onShowOrders={this.handleShowOrders} />
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
                <p>There are no outstanding kit orders</p>
                )
          )
    )
  }
}

const mapStateToProps = ({ session: { token }, user, kit: { loadingOrders, orders } }) => ({
  user,
  token,
  loadingOrders,
  orders
})

const mapDispatchToProps = {
  expiredToken,
  loadKitOrders,
  setKitOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(KitOrders)
