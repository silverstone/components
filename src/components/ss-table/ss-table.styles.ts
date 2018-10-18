import styled from 'stencil-styled-components'

const borderColor = 'rgb(222, 226, 230)'

export const Table = styled.table`
  background-color: white;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 13px;
  border-collapse: collapse;
  border: 1px solid ${borderColor};
`

export const Head = styled.thead`
  font-weight: 600;
`

export const Body = styled.tbody`
  border-top: 2px solid ${borderColor};
`

export const Row = styled.tr`
  background-color: ${p => p.stripe ? '#fafafa' : 'white'};
  &:hover {
    background-color: #f5f5f5;
  }
`

export const Cell = styled.td`
  padding: 12px 20px;
  border-top: 1px solid ${borderColor};
  margin: 0;
`