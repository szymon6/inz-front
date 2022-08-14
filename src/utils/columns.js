import { styled } from "@mui/material/styles"
import api from "api"
import { Link as UnstyledLink } from "react-router-dom"

const Link = styled(UnstyledLink)({
  color: "black",
})

export const referenceColumn = async (c, name) => {
  const { data: options } = await api.get(
    c.type == "dropdown"
      ? `options/dropdown/${c.referenceToDropdownId}`
      : `options/table/${c.referenceToId}`
  )

  return {
    type: "singleSelect",

    //options for dropdown
    valueOptions: options,

    //map values(ids) to label for every cell
    valueFormatter: ({ value }) =>
      value && options.find((o) => o.value === value).label,

    //if its display value, change it to link
    ...(c.type != "reference" &&
      c.displayValue && {
        renderCell: ({ value, id }) => (
          <Link to={`/table/${name}/${id}`}>
            {value && options.find((o) => o.value === value).label}
          </Link>
        ),
      }),
    //the same, but foreign table
    ...(c.type == "reference" && {
      renderCell: ({ value }) => {
        const option = options.find((o) => o.value === value)
        return (
          <Link to={`/table/${c.referenceTo.name}/${option.value}`}>
            {value && option.label}
          </Link>
        )
      },
    }),
  }
}

export const dateColumn = (c, name) => {
  const representDate = (date) => {
    if (new Date(date).getTime() == 0) return "yes"
    return new Date(date).toLocaleDateString("en-GB")
  }

  return {
    editable: true,
    type: "date",
    width: 120,
    valueFormatter: ({ value }) => value && representDate(value),

    ...(c.displayValue && {
      renderCell: ({ value, id }) => (
        <Link to={`/table/${name}/${id}`}>{representDate(value)}</Link>
      ),
    }),
  }
}

export const stringColumn = (c, name) => ({
  ...(c.displayValue && {
    renderCell: ({ value, id }) => (
      <Link to={`/table/${name}/${id}`}>{value}</Link>
    ),
  }),
})

export const boolColumn = {
  type: "boolean",
  width: 100,
}
export const numberColumn = {
  type: "number",
  width: 100,
}
