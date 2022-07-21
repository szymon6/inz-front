import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import api from '../api'

export default function ChangePassDialog({ handleClose }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = async ({ oldPass, newPass, newPass2 }) => {
    if (newPass !== newPass2) {
      alert("new passwords don't match")
      return
    }
    const { error } = await api.post(`auth/change-pass`, {
      oldPass,
      newPass,
    })

    if (error && error.status == '401') alert('bad password')
    else if (error) alert('error')
    else if (!error) {
      handleClose()
      alert('password changed')
    }
  }

  return (
    <div>
      <Dialog open onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              label="Old password"
              fullWidth
              type="password"
              variant="standard"
              {...register('oldPass')}
            />
            <TextField
              label="New password"
              fullWidth
              type="password"
              variant="standard"
              {...register('newPass')}
            />
            <TextField
              label="Repeat new password"
              fullWidth
              type="password"
              variant="standard"
              {...register('newPass2')}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
