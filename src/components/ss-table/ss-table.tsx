import { Component, Prop } from '@stencil/core'

@Component({
  tag: 'ss-table',
  styleUrl: 'ss-table.scss'
})
export class Table {

  @Prop() columns: any[]
  @Prop() data: any[]

  render() {
    console.log(this.columns)
    return (
      <table>
        <thead>

        </thead>
        <tbody>

        </tbody>
      </table>
    )
  }
}