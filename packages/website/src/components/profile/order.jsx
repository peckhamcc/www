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
  ItemImage,
  Price
} from '../shop/panels'
import {
  expiredToken
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

const STATUSES = {
  pending: 'Pending',
  production: 'In production',
  ready: 'Ready for pick up',
  shipped: 'Shipped',
  complete: 'Complete'
}

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
  width: 70%;
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

function formatDate (date) {
  return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

class Order extends Component {
  state = {
    loading: true,
    items: []
  }

  async componentDidMount () {
    this.setState({
      loading: true
    })

    try {
      const response = await globalThis.fetch(`${config.lambda.shopOrdersItemsGet}/${this.props.order.id}/items`, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        const {
          items,
          shipping
        } = await response.json()

        this.setState({
          loading: false,
          items,
          shipping
        })

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
      loading,
      items,
      shipping
    } = this.state
    const {
      order,
      onShowOrders
    } = this.props

    if (loading) {
      return (
        <>
          <Info>Loading order</Info>
          <Spinner />
        </>
      )
    }

    let trackingInfo = ''

    if (shipping && shipping.trackingNumber) {
      let trackingLink = `https://www.royalmail.com/track-your-item#/tracking-results/${shipping.trackingNumber}`

      if (!shipping.shippingMethod.toLowerCase().includes('recorded')) {
        trackingLink = `https://track.dpd.co.uk/search?reference=${shipping.trackingNumber}`
      }

      trackingInfo = (
        <>
          <p>Your order has shipped via {shipping.shippingMethod} on {formatDate(shipping.shiped_at || shipping.shipped_at)}- the tracking number is <a href={trackingLink}>{shipping.trackingNumber}</a></p>
        </>
      )
    }

    return (
      <>
        <h4>{formatDate(order.date)}</h4>
        {trackingInfo}
        <Table>
          <THead>
            <Row>
              <ItemHeader>Item</ItemHeader>
              <Header>Status</Header>
              <Header>Subtotal</Header>
            </Row>
          </THead>
          <TBody>
            {
              items.map((item, index) => {
                return (
                  <Row key={index}>
                    <Cell>
                      <ProductImage>
                        <ItemImage item={item} colour={item.metadata && item.metadata.colour} width={50} />
                      </ProductImage>
                      <ProductDetails>
                        <DetailWrapper>
                          {item.quantity}x {item.name}<br />{item.description}
                        </DetailWrapper>
                      </ProductDetails>
                    </Cell>
                    <Cell>{STATUSES[item.status]}</Cell>
                    <Cell><Price price={item.price} /></Cell>
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
        <Button onClick={onShowOrders}>Back to orders</Button>
      </>
    )
  }
}

const mapStateToProps = ({ session: { token }, user, shop: { loadingOrders, orders } }) => ({
  user,
  token
})

const mapDispatchToProps = {
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
