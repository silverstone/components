import React from 'react'
import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'
import { checkA11y } from '@storybook/addon-a11y'

storiesOf('Input', module)
  .addDecorator(withActions('input ss-button'))
  .addDecorator(withKnobs)
  .add('default', () => {
    const knobs = {
      placeholder: text('Placeholder', 'Enter input here'),
      type: select('Type', ['text', 'email', 'textarea', 'select'], 'text'),
      options: array('Options', ['Option 1', 'Option 2']),
    }
    return (
      <ss-input
        placeholder={knobs.type !== 'select' ? knobs.placeholder : ''}
        type={knobs.type}
      >
        {knobs.options.map(o => <option>{o}</option>)}
      </ss-input>
    )
  })