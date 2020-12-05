const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const { createServer } = require('http-server')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const TYPES = {
  Road: 'road',
  OffRoad: 'off-road'
}

const USER = 1196432

const hashify = (name) => {
  name = name.trim()
  name = name.toLowerCase()
  name = name.replace(/[^a-zA-Z0-9-_]/g, '-')
  name = name.replace(/-(-)+/g, '-')

  return name
}

const createGpx = (route, json) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <gpx creator="StravaGPX" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
    <metadata>
      <name>${entities.encodeNonUTF(json.name)}</name>
      <author>
        <name>Peckham Cycle Club</name>
        <link href="https://peckham.cc"/>
      </author>
      <link href="https://ridewithgps.com/routes/${route.id}"/>
    </metadata>
    <trk>
      <name>${entities.encodeNonUTF(json.name)}</name>
      <link href="https://ridewithgps.com/routes/${route.id}"/>
      <type>Ride</type>
      <trkseg>
        ${json.track_points.map(point => (`<trkpt lat="${point.y}" lon="${point.x}">
          <ele>${point.e}</ele>
        </trkpt>`))
          .join('\n      ')}
      </trkseg>
    </trk>
  </gpx>
  `
}

async function main () {
  const server = createServer({
    root: path.join(__dirname, 'generate')
  })

  await new Promise(resolve => {
    server.listen(() => resolve())
  })

  const MAP_GEN_URL = `http://127.0.0.1:${server.server.address().port}`
  const routes = []

  const url = `https://ridewithgps.com/users/${USER}/routes.json`
  console.info('fetching routes', url)
  const request = await fetch(url)
  const json = await request.json()

  const routesToLoad = json
    .filter(route => route.name.includes('PCC'))
    .map(route => ({
      id: route.id,
      name: route.name,
      type: route.name.includes('CX') ? TYPES.OffRoad : TYPES.Road
    }))

  for (let i = 0; i < routesToLoad.length; i++) {
    const route = routesToLoad[i]
    const url = `https://ridewithgps.com/routes/${route.id}.json`
    console.info('fetching', route.name, url)
    const request = await fetch(url)
    const json = await request.json()

    const hash = hashify(json.name)

    const output = {
      hash,
      title: json.name.trim()
        .replace(/^PCC\s?-?/, '').trim(),
      description: json.description,
      distance: Math.round(json.distance / 1000),
      vert: Math.round(json.elevation_gain),
      type: route.type,
      link: `https://ridewithgps.com/routes/${route.id}`,
      gpx: `https://ridewithgps.com/routes/${route.id}.gpx`,
      fit: `https://ridewithgps.com/routes/${route.id}.fit`,
      map: `/assets/routes/${hash}.png`
    }

    const gpx = createGpx(route, json)

    console.info('generating route thumbnail')

    const browser = await puppeteer.launch({ headless: true, devtools: true })
    const page = await browser.newPage()
    await page.goto(MAP_GEN_URL)

    const png = await page.evaluate((gpx) => {
      return showOnMap(gpx)
    }, gpx)

    fs.writeFileSync(path.resolve(__dirname, '..', 'website/assets/routes', `${hash}.png`), Buffer.from(png.replace('data:image/png;base64,', ''), 'base64'))

    await browser.close()

    routes.push(output)
  }

  server.close()

  fs.writeFileSync(path.resolve(__dirname, '..', 'website/assets/routes/index.js'), `
export default ${JSON.stringify(routes, null, 2)}
  `)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})