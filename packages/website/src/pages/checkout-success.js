import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  PageWrapper,
  Panel,
  Hero
} from '../components/panels'
import {
  Breadcrumb
} from '../components/shop/panels'
import checkoutBackground from '../../assets/checkout-bg.jpg'
import WithUser from '../components/with-user'
import {
  clearCart
} from '../store/actions'

class CheckoutPage extends Component {
  componentDidMount () {
    this.props.clearCart()
  }

  render () {
    return (
      <WithUser redirect='/checkout'>
        <PageWrapper>
          <Hero background={checkoutBackground.src} />
          <Panel>
            <Breadcrumb section={{ name: 'Success' }} />
            <h2>Order complete</h2>
            <p>Your order has been successfully submitted.</p>
            <p>Keep an eye on your <Link to='/profile/orders'>orders page</Link> to track the order progress.</p>
            <p>Please <Link to='/contact'>contact us</Link> if you have any questions.</p>
          </Panel>
        </PageWrapper>
      </WithUser>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
