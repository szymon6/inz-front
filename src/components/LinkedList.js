import { Box, Tab, Tabs } from '@mui/material'
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
        <TabPanel key={tab.table} value={value} index={i}>
          <Table name={tab.table} customURL={tab.url} />
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
              url: `linked/snow_cert/${id}/employees`,
            },
          ]}
        />
      )
    case 'other_cert':
      return (
        <TabWindow
          tabs={[
            {
              table: 'employee',
              label: 'Employees',
              url: `linked/other_cert/${id}/employees`,
            },
          ]}
        />
      )
    case 'employee':
      return (
        <TabWindow
          tabs={[
            {
              table: 'snow_cert',
              label: 'Snow Certs',
              url: `linked/employee/${id}/snow_certs/`,
            },
            {
              table: 'other_cert',
              label: 'Other Certs',
              url: `linked/employee/${id}/other_certs/`,
            },
          ]}
        />
      )
    default:
      return null
  }
}
