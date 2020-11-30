
function lightenDarkenColor (colour, amount) {
  const usePound = colour.startsWith('#')

  if (usePound) {
    colour = colour.substring(1)
  }

  const num = parseInt(colour, 16)

  let r = (num >> 16) + amount

  if (r > 255) {
    r = 255
  } else if (r < 0) {
    r = 0
  }

  let b = ((num >> 8) & 0x00FF) + amount

  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0
  }

  let g = (num & 0x0000FF) + amount

  if (g > 255) {
    g = 255
  } else if (g < 0) {
    g = 0
  }

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const dark = '#6E737B'
export const darkAccent = '#494f52'
export const darkLowlight = '#151718'
export const light = '#777'
export const lightAccent = '#f3f3f3'
export const lightLowlight = '#969696'

export const panelLevel1Background = '#FFFFFF'
export const panelLevel1Header = lightenDarkenColor(panelLevel1Background, -180)
export const panelLevel1Text = lightenDarkenColor(panelLevel1Background, -120)

export const panelLevel2Background = '#f3f3f3'
export const panelLevel2Header = lightenDarkenColor(panelLevel2Background, -180)
export const panelLevel2Text = lightenDarkenColor(panelLevel2Background, -120)
export const panelLevel2Notes = lightenDarkenColor(panelLevel2Background, -100)
export const panelLevel2Border = lightenDarkenColor(panelLevel2Background, -30)

export const panelLevel3Background = '#6E737B'
export const panelLevel3Header = lightenDarkenColor(panelLevel3Background, 180)
export const panelLevel3Text = lightenDarkenColor(panelLevel3Background, 120)
export const panelLevel3Border = lightenDarkenColor(panelLevel3Background, 100)
export const panelLevel3HoverBackground = lightenDarkenColor(panelLevel3Background, -80)

export const errorText = '#ff6459'
export const errorBackground = '#EC9590'
export const pccLightBlue = '#56d3dc'
export const pccDarkBlue = '#5874bf'
export const pccRed = '#ff454d'
export const pccYellow = '#e5e95c'
