import { Component, Prop, State, Method, Listen } from '@stencil/core'
import { Backdrop } from '../ss-backdrop/ss-backdrop';
import Fragment from 'stencil-fragment'

@Component({
  tag: 'ss-modal',
  styleUrl: 'ss-modal.scss',
  shadow: true
})
export class Modal {

  @Prop() backdrop: boolean = true
  @Prop() closeOutside: boolean = true
  @Prop() backdropCloseButton: boolean = true

  @State() show: boolean = false

  backdropEl: Backdrop

  @Method()
  open() {
    this.show = true
  }

  @Method()
  @Listen('clickCloseButton')
  close() {
    this.show = false
  }

  render() {
    return (
      <Fragment>
        <ss-backdrop 
          show={this.show}
          invisible={!this.backdrop}
          close-button={this.backdropCloseButton}
          onClick={() => this.closeOutside && this.close()}
        >
          <slot name="backdrop-close-button">
            X
          </slot>
        </ss-backdrop>
        <div class={"modal" + (this.show ? " show" : "")}>
          <slot name="title" />
          <hr />
          <slot />
        </div>
      </Fragment>
    )
  }
}
