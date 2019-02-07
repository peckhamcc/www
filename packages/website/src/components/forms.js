import styled from 'styled-components'
import {
  light,
  lightAccent,
  dark,
  darkLowlight,
  errorBackground,
  errorText
} from '../colours'
import {
  spacing
} from '../units'

export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing(1)};
`

export const Input = styled.input`
  display: block;
  padding: 5px;
  margin-bottom: ${spacing(1)};
  width: 300px;
  font-size: 18px;
`

export const CheckoutWrapper = styled.div`

`

export const TransactionId = styled.p`
  display: inline-block;
  background-color: ${light};
  color: ${darkLowlight};
  border: 5px solid ${darkLowlight};
  padding: ${spacing(1)};
  font-size: 24px;
`

export const FormInputWrapper = styled.div`
  ${props => props.error ? `
    label {
      color: ${errorText};
    }

    input {
      border: 1px solid ${errorText};
      color: ${errorText};
      background: ${errorBackground};
    }
  ` : ''}
`

export const DetailsWrapper = styled.div`
  @media (min-width: 800px) {
    display: flex;
    flex-direction: 'row';
  }
`

export const CustomerDetailsWrapper = styled.div`
  @media (min-width: 800px) {
    width: 50%;
  }

  background: ${dark};
  padding: ${spacing(1)};
  margin-top: ${spacing(1)};

  h3 {
    margin-top: 0;
    margin-bottom: ${spacing(2)};
  }
`

export const NameWrapper = styled(CustomerDetailsWrapper)`
  @media (min-width: 800px) {
    margin-right: ${spacing(1)};
  }
`

export const AddressWrapper = styled(CustomerDetailsWrapper)`
`

export const ErrorText = styled.p`
  color: ${errorText};
  padding-bottom: ${spacing(1)};
`

export const ShopCodeWrapper = styled.div`
  background: ${dark};
  padding: ${spacing(1)};
  margin-top: ${spacing(1)};
  margin-bottom: ${spacing(1)};
`

export const HelpText = styled.p`
  color: ${lightAccent};
`

export const PaymentHolder = styled.div`
  margin: ${spacing(1)} 0;
`

export const PlaceHolder = styled.div`
  margin: ${spacing(1)} 0;
`
