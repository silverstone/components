import { configure, addDecorator } from '@storybook/html'
import { checkA11y } from '@storybook/addon-a11y'

const req = require.context('../src', true, /\.stories\.js$/)

addDecorator(checkA11y)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)