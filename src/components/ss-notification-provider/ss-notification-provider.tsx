import { Component, Prop, Method, State } from '@stencil/core'
import Fragment from 'stencil-fragment'

@Component({
  tag: 'ss-notification-provider',
  styleUrl: 'ss-notification-provider.scss'
})
export class NotificationProvider {

  @Prop() position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'topright'

  @State() notifications = []

  @Method()
  notify(options: { title: string, content: string }) {
    this.notifications.push(options)
  }

  render = () => {
    <Fragment>
      <div class="notification-wrapper">
        {this.notifications.map(note =>
          <div class="notification">
            <div class="title">
              {note.title}
            </div>
            <div class="content">
              {note.content}
            </div>
          </div>
        )}
      </div>
      <slot />
    </Fragment>
  }
}