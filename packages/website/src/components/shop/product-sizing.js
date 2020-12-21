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

const VARIANT_SIZES = {
  // arm warmers
  A: [{
    code: 'S',
    name: 'Small',
    measurements: {
      bicep: {
        unisex: {
          min: 25,
          max: 30
        }
      }
    }
  }, {
    code: 'M',
    name: 'Medium',
    measurements: {
      bicep: {
        unisex: {
          min: 30,
          max: 35
        }
      }
    }
  }, {
    code: 'L',
    name: 'Large',
    measurements: {
      bicep: {
        unisex: {
          min: 35,
          max: 40
        }
      }
    }
  }],
  // jersey sizes
  J: [{
    code: 'XXS',
    name: 'Extra extra small',
    measurements: {
      chest: {
        male: {
          min: 85,
          max: 88
        },
        female: {
          min: 82,
          max: 85
        }
      },
      waist: {
        male: {
          min: 73,
          max: 76
        },
        female: {
          min: 66,
          max: 69
        }
      }
    }
  }, {
    code: 'XS',
    name: 'Extra small',
    measurements: {
      chest: {
        male: {
          min: 88,
          max: 92
        },
        female: {
          min: 85,
          max: 88
        }
      },
      waist: {
        male: {
          min: 76,
          max: 80
        },
        female: {
          min: 69,
          max: 72
        }
      }
    }
  }, {
    code: 'S',
    name: 'Small',
    measurements: {
      chest: {
        male: {
          min: 92,
          max: 96
        },
        female: {
          min: 88,
          max: 92
        }
      },
      waist: {
        male: {
          min: 80,
          max: 84
        },
        female: {
          min: 72,
          max: 76
        }
      }
    }
  }, {
    code: 'M',
    name: 'Medium',
    measurements: {
      chest: {
        male: {
          min: 96,
          max: 100
        },
        female: {
          min: 92,
          max: 96
        }
      },
      waist: {
        male: {
          min: 84,
          max: 88
        },
        female: {
          min: 76,
          max: 80
        }
      }
    }
  }, {
    code: 'L',
    name: 'Large',
    measurements: {
      chest: {
        male: {
          min: 100,
          max: 104
        },
        female: {
          min: 96,
          max: 100
        }
      },
      waist: {
        male: {
          min: 88,
          max: 92
        },
        female: {
          min: 80,
          max: 84
        }
      }
    }
  }, {
    code: 'XL',
    name: 'Extra large',
    measurements: {
      chest: {
        male: {
          min: 104,
          max: 110
        },
        female: {
          min: 100,
          max: 106
        }
      },
      waist: {
        male: {
          min: 92,
          max: 98
        },
        female: {
          min: 84,
          max: 90
        }
      }
    }
  }, {
    code: '2XL',
    name: 'XX Large',
    measurements: {
      chest: {
        male: {
          min: 110,
          max: 116
        },
        female: {
          min: 106,
          max: 114
        }
      },
      waist: {
        male: {
          min: 98,
          max: 104
        },
        female: {
          min: 90,
          max: 98
        }
      }
    }
  }, {
    code: '3XL',
    name: 'XXX Large',
    measurements: {
      chest: {
        male: {
          min: 116,
          max: 122
        },
        female: {
          min: 114,
          max: 122
        }
      },
      waist: {
        male: {
          min: 104,
          max: 110
        },
        female: {
          min: 98,
          max: 116
        }
      }
    }
  }],
  // sock sizes
  S: [{
    code: 'S/M',
    name: 'Small/Medium',
    measurements: {
      shoe: {
        unisex: 'UK 3-6'
      }
    }
  }, {
    code: 'L/XL',
    name: 'Large/Extra Large',
    measurements: {
      shoe: {
        unisex: 'UK 7-11+'
      }
    }
  }],
  // glove sizes
  G: [{
    code: 'XS',
    name: 'Extra small',
    measurements: {
      palm: {
        unisex: {
          metric: '7cm',
          imperial: '2.7"'
        }
      }
    }
  }, {
    code: 'S',
    name: 'Small',
    measurements: {
      palm: {
        unisex: {
          metric: '8cm',
          imperial: '3.1"'
        }
      }
    }
  }, {
    code: 'M',
    name: 'Medium',
    measurements: {
      palm: {
        unisex: {
          metric: '9cm',
          imperial: '3.5"'
        }
      }
    }
  }, {
    code: 'L',
    name: 'Large',
    measurements: {
      palm: {
        unisex: {
          metric: '10cm',
          imperial: '3.9"'
        }
      }
    }
  }, {
    code: 'XL',
    name: 'Extra large',
    measurements: {
      palm: {
        unisex: {
          metric: '11cm',
          imperial: '4.3"'
        }
      }
    }
  }, {
    code: 'XXL',
    name: 'XX Large',
    measurements: {
      palm: {
        unisex: {
          metric: '12cm',
          imperial: '5.1"'
        }
      }
    }
  }],
  // tshirt sizes
  T: [{
    code: 'S',
    name: 'Small',
    measurements: {
      chest: {
        male: {
          min: 86,
          max: 91
        },
        female: {
          min: 86,
          max: 89
        }
      }
    }
  }, {
    code: 'M',
    name: 'Medium',
    measurements: {
      chest: {
        male: {
          min: 96,
          max: 101
        },
        female: {
          min: 91,
          max: 94
        }
      }
    }
  }, {
    code: 'L',
    name: 'Large',
    measurements: {
      chest: {
        male: {
          min: 106,
          max: 111
        },
        female: {
          min: 99,
          max: 101
        }
      }
    }
  }, {
    code: 'XL',
    name: 'Extra large',
    measurements: {
      chest: {
        male: {
          min: 117,
          max: 122
        },
        female: {
          min: 106,
          max: 112
        }
      }
    }
  }, {
    code: 'XXL',
    name: 'XX Large',
    measurements: {
      chest: {
        male: {
          min: 127,
          max: 132
        },
        female: {
          min: 117,
          max: 122
        }
      }
    }
  }]
}

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
      const tableKey = props.product.options.size[0].substring(0, 1)
      const sizeTable = VARIANT_SIZES[tableKey]
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
      const tableKey = product.options.size[0].substring(0, 1)
      sizeTable = VARIANT_SIZES[tableKey]

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
