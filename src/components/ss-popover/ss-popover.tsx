import { Component, Prop, State, Method, Element } from '@stencil/core'
import Fragment from 'stencil-fragment'

@Component({
  tag: 'ss-popover',
  styleUrl: 'ss-popover.scss',
  shadow: true
})
export class Popover { 

	@Element() el: HTMLElement
	popoverEl: HTMLElement

	outsideClickListener = () => this.close()
	popoverClickListener = event => event.stopPropagation()

	//Props
	@Prop() type: string = "static"
	@Prop() align: string = "center"
	@Prop() position: string = "bottom"
	@Prop() margin: number = 24
	@Prop() offsetY: number = 0
	@Prop() offsetX: number = 0
	@Prop() dismissable: boolean = true
	@Prop() trigger: string = "click"

	//States
	@State() show: boolean = false
	@State() positionX: number = 0
	@State() positionY: number = 42
	
	
	//Methods
	@Method()
	open() {
		if (this.popoverEl.classList.contains("show")) {
			this.show = false
		} else {
			this.show = false
			setTimeout(() => {
				this.show = true
				if (this.trigger === "hover") {
					window.addEventListener('mouseover', this.outsideClickListener)
					this.popoverEl.addEventListener('mouseover', this.popoverClickListener)
				} else {
					window.addEventListener('click', this.outsideClickListener)
					this.popoverEl.addEventListener('click', this.popoverClickListener)
					
				}
			}, 1)
		}
	}
		
	@Method()
	close() {
		this.show = false
	}

	//Lifecycle Hooks	
	componentDidLoad() {
		setTimeout(() => {
			//Relative to container
			const containerHeight = this.el.offsetHeight
			const containerWidth = this.el.offsetWidth
	
			const popoverHeight = this.popoverEl.offsetHeight
			const popoverWidth = this.popoverEl.offsetWidth
	
			const containerCenterY = this.el.offsetHeight / 2
			const containerCenterX = this.el.offsetWidth / 2
	
			const popoverCenterY = this.popoverEl.offsetHeight / 2
			const popoverCenterX = this.popoverEl.offsetWidth / 2
	
			const posTop = -popoverHeight + -this.margin + this.offsetY
			const posLeft = -popoverWidth + -this.margin + this.offsetX
			const posRight = containerWidth + this.margin + this.offsetX
			const posBottom = containerHeight + this.margin + this.offsetY
	
			const alignCenterY = containerCenterY - popoverCenterX + this.offsetY
			const alignCenterX = containerCenterX - popoverCenterX + this.offsetX
			const alignTop = 0 + this.offsetY
			const alignBottom = containerHeight - popoverHeight + this.offsetY
			const alignLeft = 0 + this.offsetX
			const alignRight = containerWidth - popoverWidth + this.offsetX
	
			//Bottom
			if (this.align === "center" && this.position === "bottom") {
				this.positionX = alignCenterX
				this.positionY = posBottom
			}
			if (this.align === "right" && this.position === "bottom") {
				this.positionX = alignRight
				this.positionY = posBottom
			}
			if (this.align === "left" && this.position === "bottom") {
				this.positionX = alignLeft
				this.positionY = posBottom
			}
	
			//Right
			if (this.align === "center" && this.position === "right") {
				this.positionX = posRight
				this.positionY = alignCenterY
			}
			if (this.align === "top" && this.position === "right") {
				this.positionX = posRight
				this.positionY = alignTop
			}
			if (this.align === "bottom" && this.position === "right") {
				this.positionX = posRight
				this.positionY = alignBottom
			}
	
			//Top
			if (this.align === "center" && this.position === "top") {
				this.positionX = alignCenterX
				this.positionY = posTop
			}
			if (this.align === "right" && this.position === "top") {
				this.positionX = alignRight
				this.positionY = posTop
			}
			if (this.align === "left" && this.position === "top") {
				this.positionX = alignLeft
				this.positionY = posTop
			}
	
			//Left
			if (this.align === "center" && this.position === "left") {
				this.positionX = posLeft
				this.positionY = alignCenterY
			}
			if (this.align === "top" && this.position === "left") {
				this.positionX = posLeft
				this.positionY = alignTop
			}
			if (this.align === "bottom" && this.position === "left") {
				this.positionX = posLeft
				this.positionY = alignBottom
			}
	
			//Apply style
			this.popoverEl.style.transform = `translate3d(${this.positionX}px, ${this.positionY}px, 0px)`
		}, 10)
	}

	render() {
    if (this.type === "static") {
			return (
				//Popover Toggle
				<Fragment>
					<div class="has-popover">
						<a href="#" class="popover-toggle"
							onClick={(() => this.open())} 
							onMouseOver={(this.trigger === "hover" && (() => this.open()))}>
							<slot name="button">
								<div class="popover__button"></div>
							</slot>
						</a>
					</div>
					<div class={"popover" + (this.show ? " show" : "")} ref={(el: HTMLDivElement) => this.popoverEl = el}>
						<slot name="content">
							<div class="popover__content">
								<p>Your content goes here.</p>
							</div>
						</slot>
					</div>
				</Fragment>
			)  
		}
		
    if (this.type === "multi") {
			return (
				<ul>
					<li class="has-popover">
						<slot name="item2">
							<a href="#" class="popover-toggle" onClick={this.open}>POP 2</a>
						</slot>
						<div class={"popover" + (this.show ? " show" : "")} 
						ref={(el: HTMLDivElement) => this.popoverEl = el}>
						</div>
					</li>
				</ul>
			)
    }
	}   
}