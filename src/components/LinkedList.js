import * as React from 'react'
import Table from './Table'

export default function LinkedList({ forTable }) {
  switch (forTable) {
    case 'snow_cert':
      return <Table name="employee" /> //TODO filtering
    case 'other_cert':
      return <Table name="employee" /> //TODO filtering
    case 'employee':
      return <Table name="snow_cert" /> //TODO filtering, two tabs https://mui.com/material-ui/react-tabs/ - Table name="snow_cert", Table name="other_cert"
    default:
      return null
  }
}
