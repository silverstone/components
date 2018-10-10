import { Component, Prop, State } from '@stencil/core'

// export type TableColumn = { id: string, header: string }

@Component({
  tag: 'ss-table',
  styleUrl: 'ss-table.scss'
})
export class Table {

  @Prop({ reflectToAttr: true }) 
  columns: { id: string, header: string }[]

  @Prop({ reflectToAttr: true })
  data: any[]

  @Prop() showCheckboxes: boolean

  @State() selection: Set<number> = new Set()

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.showCheckboxes &&
              <td>
                <input type="checkbox" />
              </td>
            }
            {this.columns.map(col => 
              <td>{col.header}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {this.data.map((row, i) => 
            <tr>
              {this.showCheckboxes &&
                <td>
                  <input type="checkbox" />
                </td>
              }
              {this.columns.map(col =>
                <td>{row[col.id]}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}