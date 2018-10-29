import { Component, Prop, State, Method, Element, Listen } from '@stencil/core'

@Component({
  tag: 'ss-list',
  styleUrl: 'ss-list.scss',
  shadow: false
})
export class List { 

  @Element() el: HTMLElement
  
  @Prop() multi: Boolean = false
	
	//Methods
	@Method()
	open(dropdown, dropdownHeight, subMenu) {
    if (!dropdown.classList.contains("expanded")) {
      subMenu.style.display = "block"
      let listHeight = subMenu.offsetHeight
      let expandedDropdown = dropdownHeight + listHeight
      dropdown.style.height = `${expandedDropdown}px`
      dropdown.classList.add("expanded")
      console.log(dropdown.offsetHeight, subMenu.offsetHeight)
    } else if (dropdown.classList.contains("expanded")) {
      dropdown.classList.remove("expanded")
      dropdown.removeAttribute("style")
      setTimeout(() => {
        subMenu.removeAttribute("style")
      }, 250);
    }
	}
		
	@Method()
	close(dropdown) {
    let listItem = 
    Array.from(this.el.querySelectorAll("li"))
    listItem.forEach((element: HTMLElement) => {
      if (element.classList.contains("expanded") && (element != dropdown)) {
        console.log(element)
        element.classList.remove("expanded")
        element.removeAttribute("style")
      }
    })
  }

  @Listen('click')
  subListClickHandler(event) {
    if (event.target.tagName === 'A' && event.target.parentNode.classList.contains("parent")) {
      let dropdown = event.target.parentNode
      let subMenu = event.target.parentNode.querySelector("ul")
      let dropdownHeight = dropdown.offsetHeight
      if (!this.multi) {
        this.close(dropdown)
      }
      this.open(dropdown, dropdownHeight, subMenu)
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