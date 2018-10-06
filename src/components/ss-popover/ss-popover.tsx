import { Component, Prop, State, Method, Listen } from '@stencil/core'
import { Backdrop } from '../ss-backdrop/ss-backdrop';

@Component({
  tag: 'ss-popover',
  styleUrl: 'ss-popover.scss',
  shadow: true
})
export class Popover { 

  @Prop() backdrop: boolean = false
  @Prop() closeOutside: boolean = true
  @Prop() backdropCloseButton: boolean = false

  @State() show: boolean = false

  @Method()
  open() {
    this.show = true;
  }

  @Method()
  @Listen('clickCloseButton')
  close() {
    this.show = false
  }

  render() {
    return ([
        <ss-backdrop 
        show={this.show}
        invisible={!this.backdrop}
        close-button={this.backdropCloseButton}
        onClick={() => this.closeOutside && this.close()}
      >
        <slot name="backdrop-close-button">
          X
        </slot>
      </ss-backdrop>,
        //Popover Toggle
        <div class="has-popover">
            <a href="#" class="popover-toggle"
            onClick={() => this.open()}>Test</a>
        </div>,

        //Popover
        <div class={"popover" + (this.show ? " show" : "")}>
        </div>
    ])
  }
}