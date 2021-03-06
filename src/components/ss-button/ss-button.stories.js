import React from 'react'
import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select } from '@storybook/addon-knobs'

storiesOf('Button', module)
  .addDecorator(withActions('click ss-button'))
  .addDecorator(withKnobs)
  .add('default', () => {
    const knobs = {
      type: select('Type', ['basic', 'raised', 'flat', 'outline'], 'basic'),
      color: select('Color', ['plain', 'primary', 'secondary', 'danger'], 'plain'),
      text: text('Text', 'Click me'),
    }
    return (
      <ss-button type={knobs.type} color={knobs.color}>
        {knobs.text}
      </ss-button>
    )
  })