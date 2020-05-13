
module.exports = (data) => {
  const tableHead = (headers) => {
    return [
      '<ResultTable>',
      '  <thead>',
      ...tableRow(headers, 'ResultHeader'),
      '  </thead>'
    ]
  }

  const tableBody = (rows) => {
    const output = [
      '  <tbody>'
    ].concat(
      ...rows.map((row, index) => tableRow(row, 'td', index % 2 === 0 ? 'ResultRow' : 'ResultOddRow')), '  </tbody>', '</ResultTable>'
    )

    return output
  }

  const tableRow = (columns, cell = 'td', row = 'tr') => {
    return [
      `    <${row}>`,
      ...columns.map((data, index) => `      <${cell} ${index !== 1 ? 'width=\'100\' align=\'center\'' : ''}>${data}</${cell}>`),
      `    </${row}>`
    ]
  }

  let output = [
    `<h2>${data.name}</h2>`,
    ...(data.description || []).map(line => `<p>${line}</p>`)
  ]

  if (data.results) {
    data.results.forEach(result => {
      output = output.concat([
        `<h2>${result.name}</h2>`,
        ...(result.description || []).map(line => `<p>${line}</p>`),
        ...tableHead(result.headers),
        ...tableBody(result.rows)
      ])
    })
  }


  if (data.stages) {
    if (data.results) {
      output.push('<hr />')
    }

    data.stages.forEach((stage, index) => {
      output = output.concat([
        `<h3>${stage.name}</h3>`,
        stage.profile || '',
        ...(stage.description || []).map(line => `<p>${line}</p>`)
      ])

      stage.results.forEach(result => {
        output = output.concat([
          `<h4>${result.name}</h4>`,
          ...(result.description || []).map(line => `<p>${line}</p>`),
          ...tableHead(result.headers),
          ...tableBody(result.rows)
        ])
      })

      if (index < (data.stages.length - 1)) {
        output.push('<hr />')
      }
    })
  }

  return `/* eslint-disable */
import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  PageWrapper,
  Panel,
  LinkPanel,
  ResultTable,
  ResultHeader,
  ResultRow,
  ResultOddRow,
  ResultAvatar,
  ResultRiderName
} from '../components/panels'
import membershipBackground from '../../assets/membership-bg.jpg'
import equipmentBackground from '../../assets/equipment-bg.jpg'
import pccAvatar from '../../assets/pcc-logo-round.png'

export default () => {
  return (
    <PageWrapper>
      <Panel>
        ${output.join('\n        ')}
      </Panel>
      <LinkPanel background={equipmentBackground.src}>
        <Link to='/results'>Results</Link>
      </LinkPanel>
      <LinkPanel background={membershipBackground.src}>
        <Link to='/membership'>Membership</Link>
      </LinkPanel>
    </PageWrapper>
  )
}
`
}
