
import './setup'
import test from 'ava'
import faker from 'faker'
import {
  CREDIT_CARDS,
  DISPUTES
} from './data'

const enterTextInFrameElement = async (t, name, selector, text) => {
  await t.context.page.waitForSelector(`iframe[name="${name}"]`)
  const frameElement = await t.context.page.$(`iframe[name="${name}"]`)
  const frame = await frameElement.contentFrame()
  const element = await frame.$(selector)
  await element.type(text)
}

test.skip('buys a jersey', async (t) => {
  await t.context.page.goto(`${t.context.url}/shop`)

  await t.context.page.click('[data-section="jerseys"]')
  await t.context.page.click('[data-section="short-sleeved-jersey"]')

  await t.context.page.click('[data-gender="M"]')
  await t.context.page.click('[data-size="M"]')
  await t.context.page.click('[data-variant="REGULAR"]')

  await t.context.page.click('[data-button="increase-quantity"]')
  await t.context.page.click('[data-button="add-to-cart"]')

  await t.context.page.click('[data-button="go-to-checkout"]')

  await t.context.page.click('[data-button="accept-terms"]')

  await t.context.page.click('[data-button="enter-payment-information"]')

  await t.context.page.waitForSelector('[data-input="first-name"]')

  await t.context.page.type('[data-input="first-name"]', faker.name.firstName())
  await t.context.page.type('[data-input="last-name"]', faker.name.lastName())
  await t.context.page.type('[data-input="email"]', faker.internet.email())

  await t.context.page.waitForSelector('[data-button="choose-payment-method"]')
  await t.context.page.click('[data-button="choose-payment-method"]')

  await t.context.page.waitForSelector('[data-button="submit-payment"]')

  // need to wait for some sort of setup that braintree does
  await t.context.page.waitFor(500)

  await t.context.page.click('div.braintree-option__card')
  await t.context.page.waitForSelector('div.braintree-sheet__text')

  const creditCard = CREDIT_CARDS.SUCCESS.filter(card => card.type === 'VISA')[1]

  await enterTextInFrameElement(t, 'braintree-hosted-field-number', '[data-braintree-name="number"]', creditCard.number)
  await enterTextInFrameElement(t, 'braintree-hosted-field-expirationDate', '[data-braintree-name="expirationDate"]', creditCard.expiry)
  await enterTextInFrameElement(t, 'braintree-hosted-field-cvv', '[data-braintree-name="cvv"]', creditCard.ccv)
  await enterTextInFrameElement(t, 'braintree-hosted-field-postalCode', '[data-braintree-name="postalCode"]', creditCard.postCode)

  await t.context.page.waitForSelector('[data-button="submit-payment"]')
  await t.context.page.click('[data-button="submit-payment"]')

  await t.context.page.waitForSelector('[data-result="payment-success"]')

  const transactionId = await t.context.page.evaluate(() => document.querySelector('[data-transaction-id]').textContent)

  const lineItems = await t.context.gateway.transactionLineItem.findAll(transactionId)

  t.is(lineItems.length, 1)
  t.is(lineItems[0].quantity, '2')
  t.is(lineItems[0].name, 'CLUB-JERSEY-2018')
})

test.skip('fails to buy a jersey', async (t) => {
  await t.context.page.goto(`${t.context.url}/shop`)

  await t.context.page.click('[data-section="jerseys"]')
  await t.context.page.click('[data-section="short-sleeved-jersey"]')

  await t.context.page.click('[data-gender="M"]')
  await t.context.page.click('[data-size="M"]')
  await t.context.page.click('[data-variant="REGULAR"]')

  await t.context.page.click('[data-button="increase-quantity"]')
  await t.context.page.click('[data-button="add-to-cart"]')

  await t.context.page.click('[data-button="go-to-checkout"]')

  await t.context.page.click('[data-button="accept-terms"]')

  await t.context.page.click('[data-button="enter-payment-information"]')

  await t.context.page.waitForSelector('[data-input="first-name"]')

  await t.context.page.type('[data-input="first-name"]', faker.name.firstName())
  await t.context.page.type('[data-input="last-name"]', faker.name.lastName())
  await t.context.page.type('[data-input="email"]', faker.internet.email())

  await t.context.page.waitForSelector('[data-button="choose-payment-method"]')
  await t.context.page.click('[data-button="choose-payment-method"]')

  await t.context.page.waitForSelector('[data-button="submit-payment"]')

  // need to wait for some sort of setup that braintree does
  await t.context.page.waitFor(500)

  await t.context.page.click('div.braintree-option__card')
  await t.context.page.waitForSelector('div.braintree-sheet__text')

  const creditCard = DISPUTES

  await enterTextInFrameElement(t, 'braintree-hosted-field-number', '[data-braintree-name="number"]', creditCard.number)
  await enterTextInFrameElement(t, 'braintree-hosted-field-expirationDate', '[data-braintree-name="expirationDate"]', creditCard.expiry)
  await enterTextInFrameElement(t, 'braintree-hosted-field-cvv', '[data-braintree-name="cvv"]', creditCard.ccv)
  await enterTextInFrameElement(t, 'braintree-hosted-field-postalCode', '[data-braintree-name="postalCode"]', creditCard.postCode)

  await t.context.page.waitForSelector('[data-button="submit-payment"]')
  await t.context.page.click('[data-button="submit-payment"]')

  await t.context.page.waitForSelector('[data-result="payment-success"]')

  const transactionId = await t.context.page.evaluate(() => document.querySelector('[data-transaction-id]').textContent)

  const lineItems = await t.context.gateway.transactionLineItem.findAll(transactionId)

  t.is(lineItems.length, 1)
  t.is(lineItems[0].quantity, '2')
  t.is(lineItems[0].name, 'CLUB-JERSEY-2018')
})
