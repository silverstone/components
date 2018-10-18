import { Component, Prop, State, Method, Element, Listen } from '@stencil/core'

@Component({
  tag: 'ss-list',
  styleUrl: 'ss-list.scss',
  shadow: false
})
export class List { 

	@Element() el: HTMLElement
	
	//Methods
	@Method()
	open(dropdown, dropdownHeight) {
    if (!dropdown.classList.contains("expanded")) {
      dropdown.classList.add("expanded")
      let subMenu = dropdown.querySelector("ul")
      let listHeight = subMenu.offsetHeight
      let expandedDropdown = dropdownHeight + listHeight
      dropdown.style.height = `${expandedDropdown}px`
      console.log(dropdown.offsetHeight, subMenu.offsetHeight)
    } else if (dropdown.classList.contains("expanded")) {
      dropdown.classList.remove("expanded")
      dropdown.removeAttribute("style")
    }
	}
		
	@Method()
	close() {

  }

  @Listen('click')
  subListClickHandler(event) {
    if (event.target.tagName === 'A' && event.target.parentNode.classList.contains("parent")) {
      let dropdown = event.target.parentNode
      let dropdownHeight = dropdown.offsetHeight
      this.open(dropdown, dropdownHeight)
      console.log(dropdown)
    }
  }
  
  componentDidLoad() {
    if (this.el.childNodes) {
      let listItem = 
      Array.from(this.el.querySelectorAll("ul > li"))
      listItem.forEach((element: HTMLElement) => {
        let subListItem = 
        Array.from(element.querySelectorAll("ul"))
        subListItem.forEach((element: HTMLElement) => {
          element.classList.add("child")
          element.parentElement.classList.add("parent") 
        })
      })
    }
  }


	render() {
			return ([ 
        <slot />
      ])  
		}   
  }