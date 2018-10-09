import { Component, Prop, State, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ss-sidebar',
  styleUrl: 'ss-sidebar.scss',
  shadow: false
})
export class Sidebar {

  @Element() el: HTMLElement

  @Event() isOpen: EventEmitter;
  // isOpenHandler(opened: Boolean) {
  //   this.isOpen.emit(opened);
  // }

  @Prop() position: string = "start"
  @Prop() state: string = "closed"
  @Prop() mode: string = "over"
  

  @State() opened: boolean = true
  

  componentDidLoad() {
  //  document.querySelector("#ss-sheath").classList.add("push")
  }

  //Methods
	@Method()
    open() {
      this.opened = true
      this.isOpen.emit(true)
    }
  
  @Method()
    close() {
      this.opened = false
      this.isOpen.emit(false)
    }


  render() {
    return ([
      <div class="sidebar__sheath --start">
        <button onClick={() => this.open()}>open me</button>
        <button onClick={() => this.close()}>close me</button>
      </div>
    ])
  }
}