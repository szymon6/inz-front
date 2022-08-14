import Table from "components/Table"
import { useParams } from "react-router-dom"
import TableStore from "stores/TableStore"

const TablePage = () => {
  const { tableName } = useParams()
  return <Table store={new TableStore(tableName)} />
}

export default TablePage
