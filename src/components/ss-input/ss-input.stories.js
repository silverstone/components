import { storiesOf } from '@storybook/html'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'

storiesOf('Input', module)
  .addDecorator(withActions('input ss-button'))
  .addDecorator(withKnobs)
  .add('default', () => {
    const knobs = {
      placeholder: text('Placeholder', 'Enter input here'),
      type: select('Type', ['text', 'email', 'textarea', 'select'], 'text'),
      options: array('Options', ['Option 1', 'Option 2']),
    }
    return `
      <ss-input
        placeholder="${knobs.type !== 'select' ? knobs.placeholder : ''}"
        type="${knobs.type}"
      >
        ${knobs.options.map(option => `<option>${option}</option>`)}
      </ss-input>
    `
  })