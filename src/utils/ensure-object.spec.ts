import ensureObject from './ensure-object'

it('should convert a JSON string to an object', async () => {
  const str = JSON.stringify({ success: true })

  const parsed = ensureObject(str)

  expect(parsed).toHaveProperty('success')
  expect(parsed.success).toBe(true)
})

it('should return the object if an object is passed', async () => {
  const obj = { success: true }

  const parsed = ensureObject(obj)

  expect(parsed).toHaveProperty('success')
  expect(parsed.success).toBe(true)
})