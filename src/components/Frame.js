import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'

const Frame = () => {
  const drawerWidth = 240
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar>
          <Typography variant="h6" flex="1">
            TURBO RENT
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open
        variant="persistent"
        sx={{ width: `calc(100% - ${drawerWidth}px)` }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Frame
