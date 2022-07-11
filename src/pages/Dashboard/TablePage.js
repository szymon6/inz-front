import { useParams } from 'react-router-dom'
import Table from '../../components/Table'

const TablePage = () => {
  const { tableName } = useParams()
  return <Table name={tableName} />
}

export default TablePage
