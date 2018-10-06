import { Component, Prop, Watch, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'ss-backdrop',
  styleUrl: 'ss-backdrop.scss',
  shadow: true
})
export class Backdrop {
  @Prop() show: boolean = false
  @Prop() invisible: boolean = false
  @Prop() closeButton: boolean = false

  @Event() clickCloseButton: EventEmitter

  @Watch('show')
  render() {
    return (
      <div class={'backdrop' + (this.show ? ' show' : '') + (this.invisible ? ' invisible' : '')}>
        <div class="close-button">
          {this.closeButton && 
            <div onClick={() => this.clickCloseButton.emit()}>
              <slot />
            </div>
          }
        </div>
      </div>
    )
  }
}
