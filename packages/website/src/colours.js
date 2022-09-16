
export function adjustColour (colour, amount) {
  const useHash = colour.startsWith('#')

  if (useHash) {
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

  return (useHash ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const dark = '#6E737B'
export const darkAccent = '#494f52'
export const darkLowlight = '#151718'
export const light = '#777'
export const lightAccent = '#f3f3f3'
export const lightLowlight = '#969696'

export const panelLevel1Background = '#FFFFFF'
export const panelLevel1Header = adjustColour(panelLevel1Background, -180)
export const panelLevel1Text = adjustColour(panelLevel1Background, -120)
export const panelLevel1Note = adjustColour(panelLevel1Background, -90)

export const panelLevel2Background = '#f3f3f3'
export const panelLevel2Header = adjustColour(panelLevel2Background, -180)
export const panelLevel2Text = adjustColour(panelLevel2Background, -120)
export const panelLevel2Notes = adjustColour(panelLevel2Background, -100)
export const panelLevel2Border = adjustColour(panelLevel2Background, -30)

export const panelLevel3Background = '#6E737B'
export const panelLevel3Header = adjustColour(panelLevel3Background, 180)
export const panelLevel3Text = adjustColour(panelLevel3Background, 120)
export const panelLevel3Border = adjustColour(panelLevel3Background, 100)
export const panelLevel3HoverBackground = adjustColour(panelLevel3Background, -80)

export const errorText = '#ff6459'
export const errorBackground = '#EC9590'

// Light blue: PMS 630 C / CMYK: 50.0.8.0
// https://icolorpalette.com/color/pantone-630-c
export const pccLightBlue = '#77C5D5'
// Dark blue: PMS 300 C / K519 / CMYK: 89.56.0.0
// https://icolorpalette.com/color/pantone-300-c
export const pccDarkBlue = '#005eb8'
// Red: PMS 1795 C / K315 / CMYK: 0.82.77.18
// https://icolorpalette.com/color/pantone-199-c
export const pccRed = '#d22630'
// Yellow: PMS Yellow C / K101 / CMYK: 5.2.95.3
// https://icolorpalette.com/color/pantone-yellow-c
export const pccYellow = '#fedd00'
