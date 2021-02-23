import React from 'react'
import styled from 'styled-components'
import {
  errorText,
  pccDarkBlue,
  panelLevel2Background,
  panelLevel2Border,
  panelLevel2Header,
  panelLevel2Text,
  panelLevel2Notes,
  adjustColour
} from '../colours'
import {
  spacing
} from '../units'
import {
  Button
} from './panels'

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
  background-color: ${panelLevel2Background};
  color: ${panelLevel2Text};
  border: 5px solid ${panelLevel2Border};
  padding: ${spacing(1)};
  font-size: 24px;
`

export const FormInputWrapper = styled.div`
  ${props => props.error
  ? `
    label {
      color: ${errorText};
    }

    input {
      border: 1px solid ${errorText};
      color: ${errorText};
    }
  `
  : ''}
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

  background: ${panelLevel2Background};
  color: ${panelLevel2Text};
  padding: ${spacing(1)};
  margin-top: ${spacing(1)};

  h3 {
    color: ${panelLevel2Header};
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
  background: ${panelLevel2Background};
  color: ${panelLevel2Text};
  padding: ${spacing(1)};
  margin-top: ${spacing(1)};
  margin-bottom: ${spacing(1)};
`

export const HelpText = styled.p`
  color: ${panelLevel2Notes};
`

export const PaymentHolder = styled.div`
  margin: ${spacing(1)} 0;
`

export const PlaceHolder = styled.div`
  margin: ${spacing(1)} 0;
`

const ToggleLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 100px;
  margin-top: -40px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .control {
    background-color: ${pccDarkBlue};
  }

  input:disabled ~ .control {
    background-color: grey;
  }

  input:checked ~ .control:after {
    left: 55px;
  }

  .control {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 100px;
    border-radius: 25px;
    background-color: darkgray;
    -webkit-transition: background-color 0.15s ease-in;
    transition: background-color 0.15s ease-in;
  }

  .control:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 5px;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background: white;
    -webkit-transition: left 0.15s ease-in;
    transition: left 0.15s ease-in;
  }
`

export const Toggle = ({ state = false, className = '', disabled, danger, minWidth = 86, children, style, ...props }) => {
  const pointerClass = disabled ? '' : 'pointer'
  const cls = `Toggle ${pointerClass} ${className}`
  return (
    <ToggleLabel className={cls}>
      <input type='checkbox' checked={Boolean(state)} disabled={disabled} style={{ minWidth, ...style }} {...props} />
      <span className='control' />
    </ToggleLabel>
  )
}

const MultipleChoiceButton = styled(Button)`
  display: block;
  margin: 0 auto 10px auto;
  width: 90%;
  padding: 8px ${spacing(1)};
`

const SelectedButton = styled(MultipleChoiceButton)`
  background-color: ${pccDarkBlue};
  color: #FFF;
  border: 1px solid ${pccDarkBlue};

  &:hover {
    background-color: ${pccDarkBlue};
  }

  &:disabled {
    background-color: grey;
  }
`

export const MultipleChoice = ({ choices, descriptions, value, onChoose, ...props }) => {
  return (
    choices.map(choice => {
      let Component = MultipleChoiceButton

      if (value === choice) {
        Component = SelectedButton
      }

      return (
        <div key={choice}>
          <Component
            onClick={(event) => {
              event.preventDefault()

              if (choice !== value) {
                onChoose(choice)
              }
            }} {...props}
          >{descriptions[choice]}
          </Component>
        </div>
      )
    })
  )
}

export const GreenButton = styled(Button)`
  background-color: #098c0b;
  color: #FFF;
  border: 1px solid ${adjustColour('#098c0b', -1)};

  &:hover {
    background-color: ${adjustColour('#098c0b', 20)};
  }

  &:active {
    background-color: ${adjustColour('#098c0b', 60)};
  }

  &:disabled {
    background-color: grey;
  }
`

export const RedButton = styled(Button)`
  background-color: #8c0909;
  color: #FFF;
  border: 1px solid ${adjustColour('#8c0909', -1)};

  &:hover {
    background-color: ${adjustColour('#8c0909', 20)};
  }

  &:active {
    background-color: ${adjustColour('#8c0909', 60)};
  }

  &:disabled {
    background-color: grey;
  }
`

export const BlueButton = styled(Button)`
  background-color: ${pccDarkBlue};
  color: #FFF;
  border: 1px solid ${adjustColour(pccDarkBlue, -20)};

  &:hover {
    background-color: ${adjustColour(pccDarkBlue, -20)};
  }

  &:active {
    background-color: ${adjustColour(pccDarkBlue, 20)};
  }

  &:disabled {
    background-color: grey;
  }
`

export const QuantityButton = styled(Button)`
  margin: ${spacing(0.5)} 0 ${spacing(0.5)} 0;
  padding: 3px ${spacing(1)};

  @media (max-width: 940px) {
    font-size: 22px;
  }
`
