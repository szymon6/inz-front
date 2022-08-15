import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PasswordIcon from '@mui/icons-material/Password'
import { Avatar, CardHeader } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import logo from 'assets/logo.png'
import Dialogs from 'components/dialogs'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import {
  Link as UnstyledLink,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom'
import DialogStore from 'stores/DialogStore'
import UserStore from 'stores/UserStore'

export const Link = styled(UnstyledLink)`
  text-decoration: none;
  color: inherit;
`

const drawerWidth = 240

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const Dashboard = observer(() => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  if (UserStore.loading) return null
  else if (!UserStore.isLoggedIn()) return <Navigate to="/login" />

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const drawerOptions = [
    {
      name: 'Certify Employee SNOW',
      path: '/table/employee_snow_cert/new',
    },
    {
      name: 'Certify Employee',
      path: '/table/employee_other_cert/new',
      divider: true,
    },
    {
      name: 'All SNOW Certified',
      path: '/table/employee_snow_cert',
    },
    {
      name: 'All Other Certified',
      path: '/table/employee_other_cert',
      divider: true,
    },
    {
      name: 'Employees',
      path: '/table/employee',
    },
    {
      name: 'SNOW Certs',
      path: '/table/snow_cert',
    },
    {
      name: 'Other Certs',
      path: '/table/other_cert',
      divider: true,
    },
    {
      name: 'Upload File',
      path: '/file/upload',
    },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <Dialogs />

      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" noWrap component="div">
            Certification Management System
          </Typography>

          <Box
            sx={{
              ml: 'auto',
              color: 'white',
            }}
          >
            <CardHeader
              sx={{ cursor: 'pointer' }}
              avatar={
                <Avatar sx={{ width: 30, height: 30 }}>
                  {UserStore.val.username.charAt(0)}
                </Avatar>
              }
              title={UserStore.val.username}
              onClick={handleClick}
            />

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  DialogStore.open('changePass')
                }}
              >
                <PasswordIcon /> Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  UserStore.logout()
                  navigate('/login')
                }}
              >
                <LogoutIcon /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Link to="/" style={{ marginRight: 'auto', textDecoration: 'none' }}>
            <img src={logo} alt="logo" style={{ maxWidth: '100%' }} />
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerOptions.map((item, i) => (
            <Link
              to={item.path}
              style={{ textDecoration: 'none' }}
              key={item.name}
            >
              <ListItem divider={item.divider} button>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
})

export default Dashboard
