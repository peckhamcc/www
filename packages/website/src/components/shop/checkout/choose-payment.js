import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import {
  config
} from '@peckhamcc/config'
import {
  spacing
} from '../../../units'
import {
  Break
} from '../../panels'
import {
  GreenButton
} from '../../forms'

const styles = {
  leftCenter: {
    float: 'left',
    textAlign: 'center'
  },
  blockRight: {
    display: 'block',
    float: 'right'
  },
  center: {
    textAlign: 'center'
  }
}

const SqName = styled.input`
  vertical-align: top;
  display: none;
  margin: 0;
  border: none;
  font-size: 16px;
  font-family: 'Helvetica Neue';
  padding: 16px;
  color: #373F4A;
  background-color: transparent;
  line-height: 1.15em;

  &::placeholder {
    color: #000;
  }
`

const SqCVV = styled.div`
  width: 60px;
`

const SqExpirationDate = styled.div`
  width: 75px;
`

const Container = styled.div`
  width: 425px;
  margin: 0 auto;
`

const SqPostalCode = styled.div`
  width: 90px;
  text-align: center;
`

const SqCCBox = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1;
  position: relative;
  min-width: 315px;
  border-radius: 10px;
  transition: all 400ms linear;
  width: 365px;
  height: 200px;
  background-color: rgb(60, 121, 253);
  padding: 10px;
  margin: 0 auto;
  color: #CCC;
  font-weight: 600;
`

const SqWalletBox = styled.div`
  margin: 0 auto;
  width: 385px;
  text-align: center;
`

const SqCardNumber = styled.div`
  width: 200px;
`

const CCFieldWrapper = styled.div`
  padding-top: 50px;
  margin: 0;
  display: inline-flex;
`

const WalletButton = styled.div`
  display: block;
  margin: 5px auto;
  border-radius: 10px;
  height: 45px;
  width: 300px;
  overflow: hidden;
  background-clip: border-box;
  background-position: center;
`

const FormContainer = styled.div`
  width: 100%;
`

/* Customize the Apple Pay on the Web button */
const SqApplePay = styled(WalletButton)`
  width: 100%;
  margin: 24px 0 16px 0;
  background-image: url('https://docs.connect.squareup.com/assets/docs/sqpaymentform/Apple_Pay_Mark_RGB_SMALL_052318-a40c688402e8a6684ee6938a380ba825e15163872bae3b9909f70ac028a9b780.png');
  background-color: black;
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
  cursor: pointer;
  display: none;
`

/* Customize the Masterpass button */
const SqMasterPass = styled(WalletButton)`
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 24px 0 24px;
  background-image: url('https://masterpass.com/dyn/img/acc/global/mp_mark_hor_wht.svg');
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: calc((100% - 32px) / 2) 50%;
  border-radius: 4px;
  cursor: pointer;
  display: none;

  &::after {
    box-sizing: border-box;
    float: right;
    width: 32px;
    height: 48px;
    padding-top: 12px;
    content: url('data:image/svg+xml;base64,${window.btoa("<svg width='14' height='24' viewBox='0 0 14 24' xmlns='http://www.w3.org/2000/svg'><path d='M1.891 23.485c-.389 0-.778-.144-1.075-.436a1.46 1.46 0 0 1 0-2.102l9.141-8.944L.817 3.06a1.463 1.463 0 0 1 0-2.104 1.544 1.544 0 0 1 2.15 0l10.217 9.994a1.464 1.464 0 0 1 0 2.105L2.966 23.049a1.525 1.525 0 0 1-1.075.436' fill='#FFF' fill-rule='evenodd'/></svg>")}');
    background-color: #E6761F;
    border-radius: 0 4px 4px 0;
  }
`

/* Customize the Google Pay button */
const SqGooglePay = styled(WalletButton)`
  min-width: 385px;
  min-height: 40px;
  padding: 11px 24px;
  margin: 10px auto;
  background-color: #000;
  background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22103%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h3.766c.532%200%201.024.117%201.477.35.453.233.814.555%201.085.966.27.41.406.863.406%201.358%200%20.495-.124.924-.371%201.288s-.572.64-.973.826v.084c.504.177.912.471%201.225.882.313.41.469.891.469%201.442a2.6%202.6%200%200%201-.427%201.47c-.285.43-.667.763-1.148%201.001A3.5%203.5%200%200%201%204.082%2013H.148V2.976zm3.696%204.2c.448%200%20.81-.14%201.085-.42.275-.28.413-.602.413-.966s-.133-.684-.399-.959c-.266-.275-.614-.413-1.043-.413H1.716v2.758h2.128zm.238%204.368c.476%200%20.856-.15%201.141-.448.285-.299.427-.644.427-1.036%200-.401-.147-.749-.441-1.043-.294-.294-.688-.441-1.183-.441h-2.31v2.968h2.366zm5.379.903c-.453-.518-.679-1.239-.679-2.163V5.86h1.54v4.214c0%20.579.138%201.013.413%201.302.275.29.637.434%201.085.434.364%200%20.686-.096.966-.287.28-.191.495-.446.644-.763a2.37%202.37%200%200%200%20.224-1.022V5.86h1.54V13h-1.456v-.924h-.084c-.196.336-.5.611-.91.826-.41.215-.845.322-1.302.322-.868%200-1.528-.259-1.981-.777zm9.859.161L16.352%205.86h1.722l2.016%204.858h.056l1.96-4.858H23.8l-4.41%2010.164h-1.624l1.554-3.416zm8.266-6.748h1.666l1.442%205.11h.056l1.61-5.11h1.582l1.596%205.11h.056l1.442-5.11h1.638L36.392%2013h-1.624L33.13%207.876h-.042L31.464%2013h-1.596l-2.282-7.14zm12.379-1.337a1%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301%201%201%200%200%201-.735-.301zM39.93%205.86h1.54V13h-1.54V5.86zm5.568%207.098a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H45.75v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21-.317%200-.616-.051-.896-.154zm3.678-9.982h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm32.35-.341v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H96.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M75.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M68.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M65.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M68.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.30), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
  cursor: pointer;
  display: none;
`

const PaymentMethodSeparator = styled(Break)`
  margin: ${spacing(2)} 0;
`

class PaymentForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cardBrand: '',
      paymentNonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false
    }
  }

  handleRequestCardNonce = () => {
    this.setState({
      requestingNonce: true
    })

    this.paymentForm.requestCardNonce()
  }

  componentDidMount () {
    this.paymentForm = new window.SqPaymentForm({
      applicationId: config.square.applicationId,
      locationId: config.square.locationId,
      inputClass: 'sq-input',
      autoBuild: false,
      inputStyles: [{
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        padding: '16px',
        color: '#373F4A',
        backgroundColor: 'transparent',
        lineHeight: '1.15em',
        placeholderColor: '#000',
        _webkitFontSmoothing: 'antialiased',
        _mozOsxFontSmoothing: 'grayscale'
      }],
      applePay: {
        elementId: 'sq-apple-pay'
      },
      masterpass: {
        elementId: 'sq-masterpass'
      },
      googlePay: {
        elementId: 'sq-google-pay'
      },
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '• • • •  • • • •  • • • •  • • • •'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postcode'
      },
      callbacks: {
        methodsSupported: (methods) => {
          if (methods.googlePay) {
            this.setState({
              googlePay: methods.googlePay
            })
          }
          if (methods.applePay) {
            this.setState({
              applePay: methods.applePay
            })
          }
          if (methods.masterpass) {
            this.setState({
              masterpass: methods.masterpass
            })
          }
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: false,
            currencyCode: 'GBP',
            countryCode: 'UK',
            total: {
              label: 'Peckham Cycle Club',
              amount: `${this.props.amount}`,
              pending: false
            },
            lineItems: this.props.cart.map(item => {
              return {
                label: this.props.products[item.sku].name,
                amount: `${this.props.products[item.sku].price * item.quantity}`,
                pending: false
              }
            })
          }
        },
        cardNonceResponseReceived: (errors, paymentNonce) => {
          this.setState({
            requestingNonce: false
          })

          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log('Encountered errors:')
            errors.forEach(function (error) {
              console.log('  ' + error.message)
            })
          } else {
            this.props.onSuccess(paymentNonce)
          }
        },
        unsupportedBrowserDetected: () => {
          console.info('unsupportedBrowserDetected')
        },
        inputEventReceived: (inputEvent) => {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              break
            case 'focusClassRemoved':
              break
            case 'errorClassAdded':
              document.getElementById('error').innerHTML =
                'Please fix card information errors before continuing.'
              break
            case 'errorClassRemoved':
              document.getElementById('error').style.display = 'none'
              break
            case 'cardBrandChanged':
              if (inputEvent.cardBrand !== 'unknown') {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                })
              } else {
                this.setState({
                  cardBrand: ''
                })
              }
              break
            case 'postalCodeChanged':
              break
            default:
              break
          }
        },
        paymentFormLoaded: function () {
          console.info('paymentFormLoaded')

          document.getElementById('name').style.display = 'inline-flex'
        }
      }
    })
    this.paymentForm.build()
  }

  render () {
    return (
      <Container>
        <FormContainer id='form-container'>
          <SqWalletBox id='sq-walletbox'>
            <SqApplePay
              style={{ display: (this.state.applePay) ? 'inherit' : 'none' }}
              id='sq-apple-pay'
            />
            <PaymentMethodSeparator
              style={{ display: (this.state.applePay) ? 'block' : 'none' }}
            />
            <SqMasterPass
              style={{ display: (this.state.masterpass) ? 'block' : 'none' }}
              id='sq-masterpass'
            />
            <PaymentMethodSeparator
              style={{ display: (this.state.masterpass) ? 'block' : 'none' }}
            />
            <SqGooglePay
              style={{ display: (this.state.googlePay) ? 'inherit' : 'none' }}
              id='sq-google-pay'
            />
            <PaymentMethodSeparator
              style={{ display: (this.state.googlePay) ? 'block' : 'none' }}
            />
          </SqWalletBox>

          <SqCCBox id='sq-ccbox'>
            <p>
              <span style={styles.leftCenter}>Enter Card Info Below </span>
              <span style={styles.blockRight}>
                {this.state.cardBrand.toUpperCase()}
              </span>
            </p>
            <CCFieldWrapper id='cc-field-wrapper'>
              <SqCardNumber id='sq-card-number' />
              <SqExpirationDate id='sq-expiration-date' />
              <SqCVV id='sq-cvv' />
            </CCFieldWrapper>
            <SqName
              id='name'
              type='text'
              placeholder='Name'
            />
            <SqPostalCode
              id='sq-postal-code'
            />
          </SqCCBox>
          <GreenButton
            onClick={this.handleRequestCardNonce}
            disabled={this.state.requestingNonce}
          >Pay by card
          </GreenButton>
        </FormContainer>
        <p style={styles.center} id='error' />
      </Container>
    )
  }
}

const mapStateToProps = ({ shop: { cart, products } }) => ({
  cart,
  products
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)
