import { Box, Tab, Tabs, Typography } from '@mui/material'
import * as React from 'react'
import Table from './Table'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const TabWindow = ({ tabs }) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab) => (
            <Tab key={tab.table} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, i) => (
        <TabPanel value={value} index={i}>
          <Table key={tab.table} name={tab.table} filter={tab.filter} />
        </TabPanel>
      ))}
    </>
  )
}

export default function LinkedList({ table, id }) {
  switch (table) {
    case 'snow_cert':
      return (
        <TabWindow
          tabs={[
            {
              table: 'employee',
              label: 'Employees',
              filter: `snow_cert/${id}/employees`,
            },
          ]}
        />
      ) //TODO filtering
    case 'other_cert':
      return (
        <TabWindow
          tabs={[
            {
              table: 'employee',
              label: 'Employees',
              filter: `other_cert/${id}/employees`,
            },
          ]}
        />
      ) //TODO filtering
    case 'employee':
      return (
        <TabWindow
          tabs={[
            {
              table: 'snow_cert',
              label: 'Snow Certs',
              filter: `employee/${id}/snow_certs/`,
            },
            {
              table: 'other_cert',
              label: 'Other Certs',
              filter: `employee/${id}/other_certs/`,
            },
          ]}
        />
      ) //TODO filtering, two tabs https://mui.com/material-ui/react-tabs/ - Table name="snow_cert", Table name="other_cert"
    default:
      return null
  }
}
