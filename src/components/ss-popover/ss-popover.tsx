import { Component, Prop, State, Method, Element } from '@stencil/core'

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
				if (this.trigger =="hover") {
					window.addEventListener('mouseover', this.outsideClickListener)
					this.popoverEl.addEventListener('mouseover', this.popoverClickListener)
				} else {
				window.addEventListener('click', this.outsideClickListener)
				this.popoverEl.addEventListener('click', this.popoverClickListener)
				}}, 1)
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
			var containerHeight = this.el.offsetHeight
			var containerWidth = this.el.offsetWidth
	
			var popoverHeight = this.popoverEl.offsetHeight
			var popoverWidth = this.popoverEl.offsetWidth
	
			var containerCenterY = this.el.offsetHeight / 2
			var containerCenterX = this.el.offsetWidth / 2
	
			var popoverCenterY = this.popoverEl.offsetHeight / 2
			var popoverCenterX = this.popoverEl.offsetWidth / 2
	
			var posTop = -popoverHeight + -this.margin + this.offsetY
			var posLeft = -popoverWidth + -this.margin + this.offsetX
			var posRight = containerWidth + this.margin + this.offsetX
			var posBottom = containerHeight + this.margin + this.offsetY
	
			var alignCenterY = containerCenterY - popoverCenterX + this.offsetY
			var alignCenterX = containerCenterX - popoverCenterX + this.offsetX
			var alignTop = 0 + this.offsetY
			var alignBottom = containerHeight - popoverHeight + this.offsetY
			var alignLeft = 0 + this.offsetX
			var alignRight = containerWidth - popoverWidth + this.offsetX
	
	
			//Bottom
			if (this.align =="center" && this.position =="bottom") {
				this.positionX = alignCenterX
				this.positionY = posBottom
			}
			if (this.align =="right" && this.position =="bottom") {
				this.positionX = alignRight
				this.positionY = posBottom
			}
			if (this.align =="left" && this.position =="bottom") {
				this.positionX = alignLeft
				this.positionY = posBottom
			}
	
			//Right
			if (this.align =="center" && this.position =="right") {
				this.positionX = posRight
				this.positionY = alignCenterY
			}
			if (this.align =="top" && this.position =="right") {
				this.positionX = posRight
				this.positionY = alignTop
			}
			if (this.align =="bottom" && this.position =="right") {
				this.positionX = posRight
				this.positionY = alignBottom
			}
	
			//Top
			if (this.align =="center" && this.position =="top") {
				this.positionX = alignCenterX
				this.positionY = posTop
			}
			if (this.align =="right" && this.position =="top") {
				this.positionX = alignRight
				this.positionY = posTop
			}
			if (this.align =="left" && this.position =="top") {
				this.positionX = alignLeft
				this.positionY = posTop
			}
	
			//Left
			if (this.align =="center" && this.position =="left") {
				this.positionX = posLeft
				this.positionY = alignCenterY
			}
			if (this.align =="top" && this.position =="left") {
				this.positionX = posLeft
				this.positionY = alignTop
			}
			if (this.align =="bottom" && this.position =="left") {
				this.positionX = posLeft
				this.positionY = alignBottom
			}
	
			//Apply style
			this.popoverEl.style.transform = `translate3d(${this.positionX}px, ${this.positionY}px, 0px)`
	
	
			console.log(this.positionX, containerWidth, popoverWidth, containerHeight)
		}, 10)
		

	}
		

	render() {
    if (this.type =="static") {
			return ([
					
				//Popover Toggle
				<div class="has-popover">
					<a href="#" class="popover-toggle"
					onClick={(() => this.open())} 
					onMouseOver={(this.trigger=="hover" && (()=> this.open()))}>
						<slot name="button">
							<div class="popover__button"></div>
						</slot>
					</a>
				</div>,
				<div class={"popover" + (this.show ? " show" : "")} 
				ref={(el: HTMLDivElement) => this.popoverEl = el}>
					<slot name="content">
						<div class="popover__content">
							<p>Your content goes here.</p>
						</div>
					</slot>
				</div>
				
				
					
			])  
    } else { null }
    if (this.type =="multi") {
        return ([
					<ul>
						
						<li class="has-popover">
							<slot name="item2">
								<a href="#" class="popover-toggle" 
								onClick={() => this.open()}>POP 2</a>
							</slot>
							<div class={"popover" + (this.show ? " show" : "")} 
							ref={(el: HTMLDivElement) => this.popoverEl = el}>
							</div>
						</li>
					</ul>
						

        ])
    } else { null }
	}   
}