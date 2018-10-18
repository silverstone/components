// Ensures that a value is an object. If it's a string, it parses it as JSON.
export default (objectOrString) => {
  if (typeof objectOrString === 'string') {
    return JSON.parse(objectOrString)
  } else {
    return objectOrString
  }
}