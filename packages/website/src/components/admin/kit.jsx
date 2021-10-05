import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  Spinner,
  Info
} from '../panels'
import {
  BlueButton
} from '../forms'
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

const STATUSES = {
  pending: {
    next: 'production'
  },
  production: {
    previous: 'pending',
    next: 'shipped'
  },
  shipped: {
    previous: 'production',
    next: 'ready'
  },
  ready: {
    previous: 'shipped'
  }
}

function OrderList ({ orders, updatingStatus, onUpdateStatus }) {
  return (
    <Table>
      <THead>
        <Row>
          <Header>Date</Header>
          <Header>Status</Header>
          <Header>Total</Header>
          <Header>Update status</Header>
        </Row>
      </THead>
      <TBody>
        {
          orders.map(order => {
            const status = STATUSES[order.status]
            let previousButton

            if (status && status.previous) {
              previousButton = <BlueButton style={{ margin: 0 }} onClick={() => onUpdateStatus(order, status.previous)} disabled={updatingStatus}>{status.previous}</BlueButton>
            }

            let nextButton

            if (status && status.next) {
              nextButton = <BlueButton style={{ margin: 0 }} onClick={() => onUpdateStatus(order, status.next)} disabled={updatingStatus}>{status.next}</BlueButton>
            }

            return (
              <Row key={order.id}>
                <Cell>{new Date(order.date * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</Cell>
                <Cell>{order.status}</Cell>
                <Cell><Price price={order.amount} /></Cell>
                <Cell>{previousButton} {nextButton}</Cell>
              </Row>
            )
          })
        }
      </TBody>
    </Table>
  )
}

class KitOrders extends Component {
  state = {
    order: null,
    updatingStatus: false
  }

  async componentDidMount () {
    this._loadOrders().catch(err => console.error(err))
  }

  async _loadOrders () {
    this.props.loadKitOrders()

    try {
      const response = await global.fetch(config.lambda.kitOrdersGet, {
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

  handleUpdateStatus = async (order, status) => {
    this.setState({
      updatingStatus: true
    })

    try {
      const response = await global.fetch(config.lambda.kitOrdersUpdate, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.props.token
        },
        body: JSON.stringify({
          id: order.id,
          status
        })
      })

      if (response.status === 200) {
        this._loadOrders()

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        updatingStatus: false
      })
    }
  }

  render () {
    const {
      loadingOrders,
      orders
    } = this.props
    const {
      order,
      updatingStatus
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
                  <OrderList orders={orders} updatingStatus={updatingStatus} onUpdateStatus={this.handleUpdateStatus} />
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
