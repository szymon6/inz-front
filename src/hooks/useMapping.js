import api from '../api'

const mapColumns = async (columns) => {
  const mappedColumns = await Promise.all(
    columns.map(async (c) => {
      let options
      if (c.type === 'singleSelect') {
        const { data, error } = await api.get(`info/options/${c.referenceToId}`)
        options = data
        console.log(options)
      }

      return {
        field: c.name,
        headerName: c.displayName,
        editable: true,
        width: 150,
        ...(c.type && { type: c.type }),
        ...(c.type === 'singleSelect' && {
          //options for dropdown
          valueOptions: options,

          //map value(id) to label - for every cell
          valueGetter: ({ value }) =>
            options.find((o) => o.value === value).label,
        }),
      }
    })
  )

  return mappedColumns
}

const mapFields = () => {
  //later
}

const useMapping = () => {
  return {
    mapColumns,
    mapFields,
  }
}

export default useMapping
