require('dotenv').config()
const server = require('@peckhamcc/server')
const test = require('ava')
const puppeteer = require('puppeteer')

let app
const opts = {
  headless: false,
  slowMo: 0,
  timeout: 10000,

  // https://github.com/GoogleChrome/puppeteer/issues/2548#issuecomment-390077713
  args: ['--disable-features=site-per-process']
}

test.before(async (t) => {
  app = await server()
})

test.after(async (t) => {
  await app.stop()
})

test.beforeEach(async (t) => {
  t.context.url = app.url
  t.context.browser = await puppeteer.launch(opts)
  t.context.page = await t.context.browser.newPage()

  await t.context.page.goto(app.url)
})

test.afterEach(async (t) => {
  await t.context.page.close()
  await t.context.browser.close()
})
