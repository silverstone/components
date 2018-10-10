import React from '@storybook/react'
import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'

storiesOf('Table', module)
  .add('default', () => {
    const columns = [
      { id: 'firstName', header: 'First Name' },
      { id: 'lastName', header: 'Last Name' }
    ]
    return (
      <ss-table columns={columns}>
        
      </ss-table>
    )
  })