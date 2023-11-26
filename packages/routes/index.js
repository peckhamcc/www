const fetch = require('node-fetch')
const fs = require('fs-extra')
const path = require('path')
const puppeteer = require('puppeteer')
const { createServer } = require('http-server')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const TYPES = {
  Road: 'road',
  OffRoad: 'off-road'
}

const RIDEWITHGPS_IDS = [
  'https://ridewithgps.com/routes/34978326', // PCC Geoff's Suburban London Social
  'https://ridewithgps.com/routes/34684178', // PCC CX South London Loop
  'https://ridewithgps.com/routes/34684114', // PCC Surrey Hills
  'https://ridewithgps.com/routes/34684089', // PCC Peckham to Rye
  'https://ridewithgps.com/routes/34684057', // PCC Social+ Toys & Ide
  'https://ridewithgps.com/routes/34684043', // PCC Social+ School Loop
  'https://ridewithgps.com/routes/34684027', // PCC Social+ Knatts Valley
  'https://ridewithgps.com/routes/34683922', // PCC Early Morning Loop
  'https://ridewithgps.com/routes/34684072', // PCC to Kingdom
  'https://ridewithgps.com/routes/43042217', // PCC to the Archive
  'https://ridewithgps.com/routes/34684012', // PCC Social+ Crowhurst
  'https://ridewithgps.com/routes/34683876', // PCC Social
  'https://ridewithgps.com/routes/31804969', // PCC Hell of the Ashdown
  'https://ridewithgps.com/routes/28690903', // PCC to Whitstable

  'https://ridewithgps.com/routes/34684204', // PCC CX Social
  'https://ridewithgps.com/routes/34684188', // PCC CX Social Alt
  'https://ridewithgps.com/routes/34684164', // PCC CX Darent & Thames Path

  'https://ridewithgps.com/routes/35102689', // PCC Ally Pally
  'https://ridewithgps.com/routes/35012528', // PCC Thames Path East
  'https://ridewithgps.com/routes/35034777', // PCC Every London Bridge
  'https://ridewithgps.com/routes/35012502', // PCC South London Alpine
  'https://ridewithgps.com/routes/35012501', // PCC Hills of South East London

  'https://ridewithgps.com/routes/41733455', // Social+ Chelsfield Loop
  'https://ridewithgps.com/routes/41733447', // L2B2L
  'https://ridewithgps.com/routes/41733435', // Social Cold Weather
  'https://ridewithgps.com/routes/34823107', // Social Bear No Beddlestead
  'https://ridewithgps.com/routes/33741370', // PCC Reverse Beddlestead
  'https://ridewithgps.com/routes/30493729', // Social School Featherbed Return
  'https://ridewithgps.com/routes/31847012', // Social via Shire Lane
  'https://ridewithgps.com/routes/41733468', // Social+ Pilgrims and Star
  'https://ridewithgps.com/routes/41750518', // Social+ Goathurst
]

const hashify = (name) => {
  name = name.trim()
  name = name.toLowerCase()
  name = name.replace(/[^a-zA-Z0-9-_]/g, '-')
  name = name.replace(/-(-)+/g, '-')

  return name
}

const createGpx = (route_url, json) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <gpx creator="StravaGPX" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
    <metadata>
      <name>${entities.encodeNonUTF(json.name)}</name>
      <author>
        <name>Peckham Cycle Club</name>
        <link href="https://peckham.cc"/>
      </author>
      <link href="${route_url}"/>
    </metadata>
    <trk>
      <name>${entities.encodeNonUTF(json.name)}</name>
      <link href="${route_url}"/>
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

  const routesFile = path.resolve(__dirname, '..', 'website/assets/routes/index.js')
  const MAP_GEN_URL = `http://127.0.0.1:${server.server.address().port}`
  const routes = []
  let existingRoutes = []

  if (fs.existsSync(routesFile)) {
    const content = fs.readFileSync(routesFile, 'utf-8').replace(/.*\nexport\sdefault/g, '')
    existingRoutes = JSON.parse(content)
  }

  let browser

  async function getBrowser () {
    if (browser != null) {
      return browser
    }

    browser = await puppeteer.launch({
      headless: 'new',
      devtools: true
    })
  }

  try {
    for (let i = 0; i < RIDEWITHGPS_IDS.length; i++) {
      const route_url = RIDEWITHGPS_IDS[i]
      const id = route_url.split('/').pop()
      const thumbnail = path.resolve(__dirname, `../website/assets/routes/${id}.png`)

      const existingRoute = existingRoutes.find(route => route.link === route_url)

      if (fs.existsSync(thumbnail) && existingRoute) {
        console.info('Skipping', route_url, 'delete', thumbnail, 'to recreate route')
        routes.push(existingRoute)

        continue
      }

      const url = `${route_url}.json`
      const request = await fetch(url)
      const json = await request.json()

      const hash = hashify(json.name)

      const name = json.name
      const type = json.name.includes('CX') ? TYPES.OffRoad : TYPES.Road

      console.info('fetched', name, url)

      const output = {
        hash,
        title: json.name.trim()
          .replace(/^PCC\s?-?/, '').trim(),
        description: json.description || '',
        distance: Math.round(json.distance / 1000),
        vert: Math.round(json.elevation_gain),
        type: type,
        link: `${route_url}`,
        gpx: `${route_url}.gpx`,
        fit: `${route_url}.fit`,
        map: `/routes/${id}.png`
      }

      const gpx = createGpx(route_url, json)
      const b = await getBrowser()
      const page = await b.newPage()
      await page.goto(MAP_GEN_URL)

      const png = await page.evaluate((gpx) => {
        return showOnMap(gpx)
      }, gpx)

      await fs.ensureDir(path.resolve(__dirname, '..', 'website/assets/routes'))

      fs.writeFileSync(path.resolve(__dirname, '..', 'website/assets/routes', `${id}.png`), Buffer.from(png.replace('data:image/png;base64,', ''), 'base64'))

      routes.push(output)
    }

    routes.sort(route => route.name)

    fs.writeFileSync(routesFile, `// This is an autogenerated file. See the routes package for more information.
export default ${JSON.stringify(routes, null, 2)}
  `)
  } finally {
    await browser?.close()

    if (browser?.process() != null) {
      console.info('Browser process still alive, sending SIGKILL')
      browser.process().kill('SIGKILL')
    }

    server.close()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
