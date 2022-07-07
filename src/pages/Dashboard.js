import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Link } from '../styled'
import logo from '../img/logo.png'
import User from '../store/User'
import LogoutIcon from '@mui/icons-material/Logout'
import PasswordIcon from '@mui/icons-material/Password'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { Avatar, CardHeader, Dialog } from '@mui/material'
import ChangePassDialog from '../components/ChangePassDialog'

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

export default function Dashboard() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)
  const navigate = useNavigate()

  const [passChangeDialogOpened, setPassChangeDialogOpened] = React.useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!User.isLoggedIn()) return <Navigate to="/login" />

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
    },
    {
      name: 'All SNOW Certified',
      path: '/table/employee_snow_cert',
    },
    {
      name: 'All Other Certified',
      path: '/table/employee_other_cert',
    },
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      {passChangeDialogOpened && <ChangePassDialog handleClose={()=>setPassChangeDialogOpened(false)}/>} 
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
              avatar={<Avatar sx={{ width: 30, height: 30 }}>{User.val.username.charAt(0)}</Avatar>}
              title={User.val.username}
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
                  setPassChangeDialogOpened(true)
                }}
              >
                <PasswordIcon /> Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  User.logout()
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
          {drawerOptions.map((option, i) => (
            <Link
              to={option.path}
              style={{ textDecoration: 'none' }}
              key={option.name}
            >
              <ListItem divider={i == 1 || i == 4} button>
                <ListItemText primary={option.name} />
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
}
