import { Component, Prop, State, Watch } from '@stencil/core'
import ensureObject from '@/utils/ensure-object'

// export type TableColumn = { id: string, header: string }

@Component({
  tag: 'ss-table',
  styleUrl: 'ss-table.scss'
})
export class Table {

  _columns: { id: string, header: string }[]
  _data: any[]

  @Prop({ reflectToAttr: true, mutable: true }) 
  columns: { id: string, header: string }[] | string = []

  @Prop({ reflectToAttr: true, mutable: true })
  data: any[] | string = []

  @Prop() showCheckboxes: boolean

  @State() selection: Set<number> = new Set()

  @Watch('columns')
  watchColumnsHandler(newValue) {
    this._columns = ensureObject(newValue)
  }

  @Watch('data')
  watchDataHandler(newValue) {
    this._data = ensureObject(newValue)
  }

  componentWillLoad() {
    this._columns = ensureObject(this.columns)
    this._data = ensureObject(this.data)
  }

  componentWillUpdate() {
    this._columns = ensureObject(this.columns)
    this._data = ensureObject(this.data)
  }

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
            {this._columns && this._columns.map(col => 
              <td>{col.header}</td>
            )}
          </tr>
        </thead>
        <tbody>
          {this._data && this._data.map((row, i) => 
            <tr>
              {this.showCheckboxes &&
                <td>
                  <input type="checkbox" />
                </td>
              }
              {this._columns && this._columns.map(col =>
                <td>{row[col.id]}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}