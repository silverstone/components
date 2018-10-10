import { Component, Prop, State, Method, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'ss-sidebar',
  styleUrl: 'ss-sidebar.scss',
  shadow: false
})
export class Sidebar {

  @Element() el: HTMLElement
  sidebarEl: HTMLElement

  @Event() isPushingStart: EventEmitter;
  @Event() isPushingEnd: EventEmitter;
  @Event() sidebarWidth: EventEmitter;
    sidebarWidthHandler(sidebarWidth: Number) {
      this.isPushingStart.emit(sidebarWidth);
      this.isPushingEnd.emit(sidebarWidth);
    }

  @Prop() name: string
  @Prop() position: string = "start"
  @Prop() state: string = "opened"
  @Prop() mode: string = "push"
  @Prop() width: number = 230
  
  @State() currentWidth: number
  @State() opened: boolean = true
  
  componentWillLoad() {

  }
  componentDidLoad() {
    this.getSidebarWidth()
      if (this.mode=="push" && this.state=="opened" && this.position=="start") {
        this.isPushingStart.emit(true)
      } 
      if (this.mode=="push" && this.state=="opened" && this.position=="end") {
        this.isPushingEnd.emit(true)
      }
  }


  //Methods
  @Method()
    getSidebarWidth() {
      var currentSidebarWidth = this.sidebarEl.offsetWidth
      if (this.width != 230)  {
        this.sidebarWidth.emit(this.width)
      } else { this.sidebarWidth.emit(currentSidebarWidth) }
    }

	@Method()
    open() {
      this.getSidebarWidth()
      //Start Position
      if (this.opened && this.position=="start") {
        this.isPushingStart.emit(false)
        this.opened = false
        this.sidebarEl.classList.remove("open")
      } else if (!this.opened && this.position=="start") {
        this.opened = true
        this.isPushingStart.emit(true)
        this.sidebarEl.classList.add("open")
      }
  
      //End Position
      if (this.opened && this.position=="end") {
        this.isPushingEnd.emit(false)
        this.opened = false
        this.sidebarEl.classList.remove("open")
      } else if (!this.opened && this.position=="end") {
        this.opened = true
        this.isPushingEnd.emit(true)
        this.sidebarEl.classList.add("open")
      }
    }
  
  @Method()
    close() {
      // this.opened = false
      // this.isPushing.emit(false)
    }


  render() {
    return ([
      <div 
      class={"sidebar__sheath" + (this.position=="end" ? " end" : " start") + (this.opened ? " open" : "")}
      ref={(el: HTMLDivElement) => this.sidebarEl = el}
      style={{"max-width": `${this.width}px`}}>

      </div>
    ])
  }
}