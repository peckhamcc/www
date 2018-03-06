import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Break, PageWrapper, Panel, ShopListItem, Breadcrumb, SmallTextButton, Button, Quantity, Price } from '../components/panels'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { light, lightAccent, dark } from '../colours'
import config from '../config'
import { spacing } from '../units'

const Label = styled.label`
  display: block;
  margin: ${spacing(1)};
`

const CheckoutWrapper = styled.div`

  .braintree-heading {
    color: ${light};
  }
`

class Checkout extends Component {

  constructor (props) {
    super(props)

    const amount = props.cart.reduce((acc, item) => {
      const product = config.store.products.find(product => product.sku === item.sku)

      return acc + (product.price * item.quantity)
    }, 0)

    this.state = {
      canMakePayment: false,
      loadingToken: true
    }
  }

  componentDidMount () {
    fetch(config.lambda.clientToken, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(result => {
        braintree.dropin.create({
          authorization: result.clientToken,
          container: this.payment,
          paypal: {
            flow: 'vault'
          }
        }, (error, instance) => {
          if (error) {
            return console.error(error)
          }

          this.setState({
            loadingToken: false
          })

          this.form.addEventListener('submit', (event) => {
            event.preventDefault()
    
            instance.requestPaymentMethod((error, payload) => {
              if (error) {
                return console.error(error)
              }
    
              // Add the nonce to the form and submit
              document.querySelector('#nonce').value = payload.nonce
              form.submit()
            })
          })
        })
      })
      .catch(error => console.error(error))
  }

  render () {
    const { cart } = this.props
    const { loadingToken } = this.state

    if (!cart.length) {
      return (
        <p>There's nothing in your cart. Try visiting the <Link to='/shop'>shop</Link>?</p>
      )
    }

    return (
      <CheckoutWrapper>
        {loadingToken && <p>Loading payment methods...</p>}
        <form ref={ref => this.form = ref}>
        
        </form>
        <div ref={ref => this.payment = ref}></div>
      </CheckoutWrapper>
      
    )
  }
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  user: PropTypes.object
}

const mapStateToProps = ({ shop: { cart }, user: { user } }) => ({
  cart,
  user
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
