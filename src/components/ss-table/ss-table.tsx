import { Component, Prop, State, Watch } from '@stencil/core'
import ensureObject from '@/utils/ensure-object'
import { Table, Head, Body, Row, Cell } from './ss-table.styles'

@Component({
  tag: 'ss-table',
  styleUrl: 'ss-table.scss'
})
export class TableComponent {

  _columns: { id: string, header: string }[]
  _data: any[]

  @Prop() 
  columns: { id: string, header: string }[] | string = []

  @Prop()
  data: any[] | string = []

  @Prop() checkboxes: boolean

  @State() selection: Set<number> = new Set()

  @Watch('columns')
  watchColumnsHandler(newValue) {
    this._columns = ensureObject(newValue)
  }

  @Watch('data')
  watchDataHandler(newValue) {
    this._data = ensureObject(newValue)
  }

  ensureObjects() {
    this._columns = ensureObject(this.columns)
    this._data = ensureObject(this.data)
  }

  componentWillLoad() {
    this.ensureObjects()
  }

  componentDidLoad() {
    this.ensureObjects()
  }

  componentWillUpdate() {
    this.ensureObjects()
  }

  componentDidUpdate() {
    this.ensureObjects()
  }

  toggleSelectRow(index, event) {
    const selection = new Set(this.selection)
    if (event.target.checked) {
      selection.add(index)
    } else {
      selection.delete(index)
    }
    this.selection = selection
    event.preventDefault()
  }

  toggleSelectAllRows(event) {
    const selection = new Set(this.selection)
    if (!event.target.checked) {
      selection.clear()
    } else {
      for (let i = 0; i < this._data.length; i++) {
        selection.add(i)
      }
    }
    this.selection = selection
    event.preventDefault()
  }

  areAllRowsChecked() {
    return this.selection.size === this._data.length
  }

  render() {
    console.log(this.selection)
    return (
      <Table>
        <Head>
          <Row>
            {this.checkboxes &&
              <Cell>
                <input type="checkbox" checked={this.areAllRowsChecked()} onChange={(e: any) => this.toggleSelectAllRows(e)} />
              </Cell>
            }
            {this._columns && this._columns.map(col => 
              <Cell>{col.header}</Cell>
            )}
          </Row>
        </Head>
        <Body>
          {this._data && this._data.map((row, i) => 
            <Row stripe={i % 2 === 0 ? false : true}>
              {this.checkboxes &&
                <Cell>
                  <input type="checkbox" checked={this.selection.has(i)} onChange={(e: any) => this.toggleSelectRow(i, e)} />
                </Cell>
              }
              {this._columns && this._columns.map(col =>
                <Cell>{row[col.id]}</Cell>
              )}
            </Row>
          )}
        </Body>
      </Table>
    )
  }
}