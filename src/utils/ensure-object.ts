// Ensures that a value is an object. If it's a string, it parses it as JSON.
export default (objectOrString) => {
  if (typeof objectOrString === 'string') {
    try {
      return JSON.parse(objectOrString)
    } catch (error) {
      return null
    }
  } else {
    return objectOrString
  }
}