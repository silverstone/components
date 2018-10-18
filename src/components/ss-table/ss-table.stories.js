import React from 'react'
import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'

storiesOf('Table', module)
  .add('default', () => {
    const columns = [
      { id: 'firstName', header: 'First Name' },
      { id: 'lastName', header: 'Last Name' }
    ]
    const data = [
      { firstName: 'Michael', lastName: 'Auderer' },
      { firstName: 'Royce', lastName: 'Shayegan' }
    ]
    return (
      <ss-table columns={JSON.stringify(columns)} data={JSON.stringify(data)}>
        
      </ss-table>
    )
  })