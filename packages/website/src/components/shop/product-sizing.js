import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  SelectableOption
} from '../panels'
import {
  spacing
} from '../../units'
import {
  lightAccent,
  pccDarkBlue
} from '../../colours'
import {
  OPTIONS
} from '@peckhamcc/config'

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
  background-color: ${pccDarkBlue};
  color: ${lightAccent};
  padding: 3px 5px;
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

    if (props.product.options.size) {
      const tableKey = props.product.sizeChart
      const sizeTable = Object.keys(OPTIONS.size[tableKey]).map(code => {
        return {
          code,
          ...OPTIONS.size[tableKey][code]
        }
      })
      const size = sizeTable[0]

      const measurements = Object.keys(size.measurements)
      const genders = Object.keys(size.measurements[measurements[0]])

      defaultGender = genders[0] || 'unisex'
      defaultUnit = 'metric'
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

    let genderControls = <></>
    let unitControls = <></>
    let sizeTable

    if (product.options.size) {
      const tableKey = product.sizeChart
      sizeTable = Object.keys(OPTIONS.size[tableKey]).map(code => {
        return {
          code,
          ...OPTIONS.size[tableKey][code]
        }
      })

      const size = sizeTable[0]
      const measurement = Object.keys(size.measurements).pop()
      const genders = Object.keys(size.measurements[measurement])
      const sizes = size.measurements[measurement][genders[0]]

      if (typeof sizes !== 'string') {
        // do imperial/metric conversion
        unitControls = (
          <UnitControls>
            {
              ['metric', 'imperial'].map((u, index) => (
                <SelectableOption
                  selected={u === unit}
                  onClick={() => this.setUnit(u)}
                  key={index}
                  data-gender={u}
                >{capitalise(u)}
                </SelectableOption>
              ))
            }
          </UnitControls>
        )
      }

      if (genders.length > 1) {
        genderControls = (
          <GenderControls>
            {
              genders.map((g, index) => (
                <SelectableOption
                  selected={g === gender}
                  onClick={() => this.setGender(g)}
                  key={index}
                  data-gender={g}
                >{capitalise(g)}
                </SelectableOption>
              ))
            }
          </GenderControls>
        )
      }
    }

    return (
      <SizingContainer>
        <h3>Sizing</h3>
        {sizeTable ? (
          <>
            <SizeControls>
              {genderControls}
              {unitControls}
            </SizeControls>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Sizes</TableHeader>
                  {sizeTable.map((size, index) => <TableHeader key={index}>{size.code}</TableHeader>)}
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(sizeTable[0].measurements).map((attribute, index) => {
                    return (
                      <tr key={index}>
                        <TableHeader>{capitalise(attribute)}</TableHeader>
                        {sizeTable.map((size, index) => {
                          let sizeDisplay = size.measurements[attribute][gender]

                          if (typeof sizeDisplay !== 'string') {
                            // min/max based on unit type
                            if (unit === 'metric') {
                              sizeDisplay = `${sizeDisplay.min}-${sizeDisplay.max}cm`
                            } else {
                              sizeDisplay = `${parseInt(sizeDisplay.min * 0.39)}-${parseInt(sizeDisplay.max * 0.39)}"`
                            }
                          }

                          return (
                            <TableCell key={index}>{sizeDisplay}</TableCell>
                          )
                        })}
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </>
        ) : (
          <p>One size fits all</p>
        )}
      </SizingContainer>
    )
  }
}

export default Sizing
