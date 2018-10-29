import React from 'react'
import { storiesOf } from '@storybook/react'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'

storiesOf('Topbar', module)
  .add('default', () => {
    return (
      <ss-topbar nav template="dashboard">
        <div slot="tool-1">
          <ss-popover align="right" offset-x="144">
          </ss-popover>
        </div>
        <div slot="tool-2">
          <ss-popover align="right" offset-x="96">
          </ss-popover>
        </div>
        <div slot="tool-3">
          <ss-popover align="right" offset-x="48">
          </ss-popover>
        </div>
        <div slot="tool-4">
          <ss-popover align="right">
          </ss-popover>
        </div>
      </ss-topbar>
    )
  })