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
  ItemImage,
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  border-bottom: 1px solid ${panelLevel2Border};
`

const TFoot = styled.tfoot`
  border-top: 1px solid ${panelLevel2Border};
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

const ItemHeader = styled(Header)`
  width: 80%;
`

const RightAlignedCell = styled(Cell)`
  text-align: right;
`

const ProductImage = styled.div`
  display: inline-block;
  margin: 4px ${spacing(1)} 0 0;
  border: 1px solid ${panelLevel2Border};
  padding: 4px;
  vertical-align: top;
`

const ProductDetails = styled.div`
  display: inline-block;
  vertical-align: top;
`

const DetailWrapper = styled.div`
  margin: ${spacing(1)} 0;
`

const STATUSES = {
  pending: (
    <p>This order is awaiting submission to the factory for production</p>
  ),
  production: (
    <p>This order is in production at the factory</p>
  ),
  ready: (
    <p>This order ready for pick up from <a href='https://ratracecycles.com/'>Rat Race Cycles</a></p>
  ),
  complete: (
    <p>This order is complete</p>
  )
}

const Order = ({ order }) => {
  const date = new Date(order.date)

  return (
    <div>
      <h4>{date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
      {STATUSES[order.status] && STATUSES[order.status]}
      <Table>
        <THead>
          <Row>
            <ItemHeader>Item</ItemHeader>
            <Header>Subtotal</Header>
          </Row>
        </THead>
        <TBody>
          {
            order.items.map((item, index) => {
              return (
                <Row key={index}>
                  <Cell>
                    <ProductImage>
                      <ItemImage item={item} width={50} />
                    </ProductImage>
                    <ProductDetails>
                      <DetailWrapper>
                        {item.quantity}x {item.name}<br />{item.description}
                      </DetailWrapper>
                    </ProductDetails>
                  </Cell>
                  <Cell><Price price={item.price * item.quantity} /></Cell>
                </Row>
              )
            })
          }
        </TBody>
        <TFoot>
          <Row>
            <RightAlignedCell>
              Total
            </RightAlignedCell>
            <Cell>
              <Price price={order.amount} />
            </Cell>
          </Row>
        </TFoot>
      </Table>
    </div>
  )
}

class Orders extends Component {
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
      const response = await global.fetch(config.lambda.shopOrdersGet, {
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

  render () {
    const {
      loadingOrders,
      orders
    } = this.props

    return (
      loadingOrders ? (
        <>
          <Info>Loading orders</Info>
          <Spinner />
        </>
      ) : (
        orders.length ? (
          orders.map(order => (
            <Order order={order} key={order.id} />
          ))
        ) : (
          <p>You have no outstanding kit orders</p>
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
