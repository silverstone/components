import { Component, Prop, State, Method, Element, Event, EventEmitter, Listen, Watch } from '@stencil/core';


@Component({
  tag: 'ss-sidebar',
  styleUrl: 'ss-sidebar.scss',
  shadow: true
})
export class Sidebar {

  @Element() el: HTMLElement
  sidebarEl: HTMLElement

  @Event() isPushingStart: EventEmitter;
  @Event() isPushingEnd: EventEmitter;
  @Event() isDismissable: EventEmitter;
  @Event() hasBackdrop: EventEmitter;
  @Event() sidebarWidth: EventEmitter;
  
  @Prop() name: string
  @Prop() position: string = "start"
  @Prop() state: string = "opened"
  @Prop({ reflectToAttr: true, mutable: true }) over: boolean = false
  @Prop() mode: string = "push"
  @Prop() width: number = 230
  @Prop() backdrop: boolean = true 
  @Prop({ reflectToAttr: true, mutable: true}) dismissable: boolean = false
  @Prop({ reflectToAttr: true, mutable: true }) opened = false
  
  @State() currentWidth: number
  
  componentDidLoad() {
    this.getSidebarWidth()
    if (this.mode=="push" && this.state=="opened" && this.position=="start") {
      this.isPushingStart.emit(true)
    } 
    if (this.mode=="push" && this.state=="opened" && this.position=="end") {
      this.isPushingEnd.emit(true)
    }
    if (this.state=="closed") {
      this.opened = false
    } else if (this.state=="opened") {
      this.opened = true
    }
    
    this.getViewport();
    window.addEventListener('resize', () => {
      this.getViewport();
    })
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
    getViewport() {
      if (window.innerWidth <= 992 && this.state == "opened") {
        this.opened = false
        if (this.mode=="push") {
          console.log("hello")
          this.isPushingStart.emit(false)
          this.over = true
          this.dismissable = true
        }
      } else if (window.innerWidth > 992 && this.opened == false && this.state == "opened") {
        this.opened = true
        if (this.mode == "push") {
          this.isPushingStart.emit(true)
          this.over = false
          this.dismissable = false
        }
      }
    }

	@Method()
    open() {
      this.getSidebarWidth()
      //Start Position
      if (this.opened && this.position=="start") {
        if (this.mode =="push") {
          this.isPushingStart.emit(false)
        }
        this.opened = false
      } else if (!this.opened && this.position=="start") {
        if (this.mode=="push" && !this.over) {
          this.isPushingStart.emit(true)
        }
        this.opened = true
      }


      
      
  
      //End Position
      if (this.opened && this.position=="end") {
        this.isPushingEnd.emit(false)
        this.opened = false
      } else if (!this.opened && this.position=="end") {
        this.opened = true
        this.isPushingEnd.emit(true)
      }
    }
  
  @Method()
    close() {
      if (this.opened) {
        this.opened = false
        this.isPushingStart.emit(false)
      }
    }

  
    


  render() {
    return (
      <div 
        class={"sidebar__sheath" + (this.position=="end" ? " end" : " start") + (this.opened ? " open" : "") + (this.dismissable ? " dismissable" : "") + (this.over ? " over" : "")}
        ref={(el: HTMLDivElement) => this.sidebarEl = el}
        style={{"max-width": `${this.width}px`}}
      />
    )
  }
}