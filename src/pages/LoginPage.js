import { ThemeProvider } from '@emotion/react'
import { Alert, createTheme, CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import logo from '../img/logo.png'
import User from '../store/User'

const SignIn = observer(() => {
  const { register, handleSubmit, reset } = useForm()
  const [error, setError] = useState(false)
  const [remember, setRemember] = useState(false)

  if (User.isLoggedIn()) return <Navigate to="/" />

  async function submit({ username, pass }) {
    const success = await User.login(username, pass, remember)
    if (!success) setError(true)
    reset()
  }

  const theme = createTheme({
    palette: {
      background: {
        default: 'white',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="logo" style={{ maxWidth: '100%' }} />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoComplete="email"
              autoFocus
              {...register('username')}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('pass')}
            />

            {error && (
              <Alert severity="error">Incorrect email or password</Alert>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
})

export default SignIn
