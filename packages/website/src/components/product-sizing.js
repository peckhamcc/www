import React, {
  Component,
  Fragment
} from 'react'
import styled from 'styled-components'
import {
  SelectableOption
} from './panels'
import {
  spacing
} from '../units'
import {
  dark
} from '../colours'

const capitalise = (string) => {
  string = string.trim()
  return string.substring(0, 1).toUpperCase() + string.substring(1)
}

const SizingContainer = styled.div`
  padding-right: ${spacing(1.5)};
`

const Table = styled.table`
  margin: ${spacing(1)} 0;
  width: 100%;
`

const TableHeader = styled.th`
  background-color: ${dark};
`

const TableCell = styled.td`
  text-align: center;
`

const SizeControls = styled.div`
  display: flex;
  flex-direction: 'row';
`

const GenderControls = styled.div`
  flex-grow: 1;
`

const UnitControls = styled.div`

`

class Sizing extends Component {
  constructor (props) {
    super(props)

    let defaultGender = null
    let defaultUnit = null

    if (props.product.sizes) {
      const size = props.product.sizes[0]
      const measurment = Object.keys(size.measurements).pop()
      const genders = Object.keys(size.measurements[measurment])
      const units = Object.keys(size.measurements[measurment][genders[0]])

      defaultGender = genders[0]
      defaultUnit = units[0]
    }

    this.state = {
      gender: props.gender ? props.gender.name.toLowerCase() : defaultGender,
      unit: props.unit ? props.unit.name.toLowerCase() : defaultUnit
    }
  }

  setGender = (gender) => {
    this.setState({
      gender
    })
  }

  setUnit = (unit) => {
    this.setState({
      unit
    })
  }

  render () {
    const {
      gender, unit
    } = this.state
    const {
      product
    } = this.props

    let genderControls = <Fragment />
    let unitControls = <Fragment />

    if (product.sizes) {
      const size = product.sizes[0]
      const measurment = Object.keys(size.measurements).pop()
      const genders = Object.keys(size.measurements[measurment])
      const units = Object.keys(size.measurements[measurment][genders[0]])

      if (genders.length > 1) {
        genderControls = (
          <GenderControls>
            {
              genders.map((g, index) => (
                <SelectableOption
                  selected={g === gender}
                  onClick={() => this.setGender(g)}
                  key={index}
                  data-gender={g}>{capitalise(g)}</SelectableOption>
              ))
            }
          </GenderControls>
        )
      }

      if (units.length > 1) {
        unitControls = (
          <UnitControls>
            {
              units.map((u, index) => (
                <SelectableOption
                  selected={u === unit}
                  onClick={() => this.setUnit(u)}
                  key={index}
                  data-gender={u}>{capitalise(u)}</SelectableOption>
              ))
            }
          </UnitControls>
        )
      }
    }

    return (
      <SizingContainer>
        <h3>Sizing</h3>
        {product.sizes ? (
          <Fragment>
            <SizeControls>
              {genderControls}
              {unitControls}
            </SizeControls>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Sizes</TableHeader>
                  {product.sizes.map((size, index) => <TableHeader key={index}>{size.code}</TableHeader>)}
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(product.sizes[0].measurements).map((attribute, index) => (
                    <tr key={index}>
                      <TableHeader>{capitalise(attribute)}</TableHeader>
                      {product.sizes.map((size, index) => (
                        <TableCell key={index}>{size.measurements[attribute][gender][unit]}</TableCell>
                      ))}
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            {product.fs260 && <p>Endura sell non-custom versions through large chain stores such as Evans. If you'd like to try items on for size before ordering, until the club has ordered enough kit so that someone has the size you want to try, you can probably do so there.</p>}
            {product.fs260 && <p>This product is most similar to the <a href={product.fs260.link}>{product.fs260.name}</a>.</p>}
          </Fragment>
        ) : (
          <p>One size fits all</p>
        )}
      </SizingContainer>
    )
  }
}

export default Sizing
