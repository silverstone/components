import { Component } from '@stencil/core'

@Component({
  tag: 'ss-sidebar',
  styleUrl: 'ss-sidebar.scss'
})
export class Sidebar {

  render() {
    return (
      <div class="wrapper">
        <div class="sidebar">
          
        </div>
        <div class="content">
          <slot />
        </div>
      </div>
    )
  }
}