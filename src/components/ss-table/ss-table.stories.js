import { storiesOf } from '@storybook/html'
import { withActions } from '@storybook/addon-actions'
import { withKnobs, text, select, array } from '@storybook/addon-knobs'
import { checkA11y } from '@storybook/addon-a11y'

storiesOf('Table', module)
  .add('default', () => {
    return `
      <ss-table columns="${[{header: 'First Name', id: 'firstName'}]}">
        
      </ss-table>
    `
  })