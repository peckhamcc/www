import React, {
  Component
} from 'react'
import styled from 'styled-components'
import {
  SelectableOption,
  Note
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
      if (props.product.options.gender != null) {
        defaultGender = props.product.options.gender[0]
      }

      defaultGender = defaultGender ?? 'U'
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
      sizeTable = Object.keys(OPTIONS.size[tableKey].options).map(code => {
        return {
          code,
          ...OPTIONS.size[tableKey].options[code]
        }
      })

      // filter sizes that are not available to the current gender, if not unisex
      sizeTable = sizeTable.filter(size => {
        if (gender === 'U') {
          return true
        }

        return Object.values(size.measurements).every(measurement => Boolean(measurement[gender]))
      })

      // only sort jersey/bib sizes, everything is S/M/L etc and should not be sorted
      if (sizeTable[0].code === '1') {
        sizeTable = sizeTable.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }

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
              genders.filter(g => {
                // ensure product is available in this gender
                const genderKey = Object.keys(OPTIONS.gender.options).find(key => {
                  return g === OPTIONS.gender.options[key].toLowerCase()
                })

                if (genderKey == null) {
                  return true
                }

                return product.options.gender.includes(genderKey)
              }).map((g, index) => (
                <SelectableOption
                  selected={g === gender}
                  onClick={() => this.setGender(g)}
                  key={index}
                  data-gender={g}
                >{capitalise(OPTIONS.gender.options[g])}
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
        {sizeTable
          ? (
            <>
              <SizeControls>
                {genderControls}
                {unitControls}
              </SizeControls>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Sizes</TableHeader>
                    {sizeTable.map((size, index) => <TableHeader key={index}>{size.name}</TableHeader>)}
                  </tr>
                </thead>
                <tbody>
                  {
                  Object.keys(sizeTable[0].measurements).map((attribute, index) => {
                    return (
                      <tr key={index}>
                        <TableHeader>{capitalise(attribute)}</TableHeader>
                        {sizeTable.map((size, index) => {
                          let sizeDisplay

                          if (size.measurements[attribute][gender]) {
                            sizeDisplay = size.measurements[attribute][gender]
                          } else {
                            sizeDisplay = size.measurements[attribute]
                          }

                          if (typeof sizeDisplay !== 'string') {
                            if (sizeDisplay.min && sizeDisplay.max) {
                              // min/max based on unit type
                              if (unit === 'metric') {
                                sizeDisplay = `${sizeDisplay.min}-${sizeDisplay.max}cm`
                              } else {
                                sizeDisplay = `${parseInt(sizeDisplay.min * 0.39)}-${parseInt(sizeDisplay.max * 0.39)}"`
                              }
                            } else {
                              // just a size
                              if (unit === 'metric') {
                                sizeDisplay = `${sizeDisplay}cm`
                              } else {
                                sizeDisplay = `${parseInt(sizeDisplay * 0.39)}"`
                              }
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
              <Note>Garment sizes are approximate and for guidance only.</Note>
            </>
            )
          : (
            <p>One size fits all</p>
            )}
      </SizingContainer>
    )
  }
}

export default Sizing
