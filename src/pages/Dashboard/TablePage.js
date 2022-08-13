import Table from "components/Table"
import { useParams } from "react-router-dom"

const TablePage = () => {
  const { tableName } = useParams()
  return <Table name={tableName} />
}

export default TablePage
