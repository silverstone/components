import { Component, Prop, State, Method, Element } from '@stencil/core';
import { Backdrop } from '../ss-backdrop/ss-backdrop';
import { Sheath } from '../ss-sheath/ss-sheath';

@Component({
  tag: 'ss-sidebar',
  styleUrl: 'ss-sidebar.scss',
  shadow: true
})
export class Sidebar {

  @Element() el: HTMLElement

  sheathEl: Sheath
  backdropEl: Backdrop

  @Prop() position: string = "start"
  @Prop() state: string = "closed"
  @Prop() mode: string = "over"
  

  @State() opened: boolean = true

  componentDidLoad() {
    // if (this.opened) {
    //   this.sheathEl.el.classList.add("push")
    // }
  }

  //Methods
	@Method()
    open() {
      this.opened = true
    }
  
  @Method()
    close() {
      this.opened = false
    }


  render() {
    return ([
      <div class="sidebar__sheath --start"></div>
    ])
  }
}