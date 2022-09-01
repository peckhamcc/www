const XLSX = require('xlsx')
const path = require('path')

const jerseySizes = {
  1: 'D',
  2: 'E',
  3: 'F',
  4: 'G',
  5: 'H',
  6: 'I',
  7: 'J',
  8: 'K',
  '1+': 'L',
  '2+': 'M',
  '3+': 'N',
  '4+': 'O'
}

const sizeLookup = {
  accessories: {
    1: 'F',
    '2/3': 'G',
    '4/5': 'H',
    '6/8': 'I'
  },
  jerseys: jerseySizes,
  outerwear: jerseySizes,
  'skin-suits': jerseySizes,
  'bib-shorts-and-tights': jerseySizes,
  casualwear: {}
}

module.exports = function (items) {
  const workbook = XLSX.readFile(path.join(__dirname, 'ORDER FORM.xlsx'))

  for (const sku of Object.keys(items)) {
    console.info('Search for', sku)
    const item = items[sku]

    let found = false

    for (const [name, sheet] of Object.entries(workbook.Sheets)) {
      for (const [cell, content] of Object.entries(sheet)) {
        if (content && content.v && content.v.toString().toLowerCase() === sku.toLowerCase()) {
          console.info('Found', name, cell)
          found = true

          const column = cell.match(/[A-Z]+/)[0]
          const row = cell.replace(column, '')

          console.info('Column', column, 'Row', cell.replace(column, ''))

          for (const size of Object.keys(item.sizes)) {
            const column = sizeLookup[item.section][size]

            if (column == null) {
              throw new Error(`Could not find size column for ${sku} and size ${size} in section ${item.section}`)
            }

            const sizeCellLocation = column + row
            let sizeCell = sheet[sizeCellLocation]

            if (!sizeCell) {
              sizeCell = {
                t: 'n',
                v: 0
              }
            }

            sizeCell.v += item.sizes[size]

            console.info(size, sizeCellLocation, sizeCell.v)

            sheet[sizeCellLocation] = sizeCell
          }
        }
      }
    }

    if (!found) {
      throw new Error(`Missing sku ${sku}`)
    }
  }

  const now = new Date()

  return {
    filename: `Peckham CC order ${now.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    })}.xlsx`,
    content: XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx'
    })
  }
}
