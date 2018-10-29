import { newE2EPage } from '@stencil/core/testing'

it('should render a button component', async () => {
  const page = await newE2EPage()
  await page.setContent('<ss-button></ss-button>')
  const el = await page.find('ss-button')
  expect(el).toBeDefined()
})

describe('ripples', () => {
  it('should create a ripple when left-clicked', async () => {
    const page = await newE2EPage()
    await page.setContent('<ss-button></ss-button>')

    const el = await page.find('ss-button')

    await page.$eval('ss-button', (elm: any) => {
      expect(elm.ripples.length).toBe(0)
    })

    el.click({ button: 'left' })
    await page.waitForChanges()

    await page.$eval('ss-button', (elm: any) => {
      expect(elm.ripples.length).toBe(1)
    })
  })
})
