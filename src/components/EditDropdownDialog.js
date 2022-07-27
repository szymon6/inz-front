import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api'
import Table from './Table'

export default function EditDropdownDialog({ dropdown, close }) {
  const { register, handleSubmit, reset } = useForm()
  const [reload, setReload] = useState(false)

  const submit = async ({ value }) => {
    console.log(dropdown)
    await api.post(`table/${dropdown}`, { value })
    setReload(true)
    reset()
  }

  useEffect(() => {
    setReload(false)
  }, [reload])

  return (
    <div>
      <Dialog fullWidth maxWidth="xs" open={true} onClose={close}>
        <DialogContent>
          <form
            onSubmit={handleSubmit(submit)}
            style={{
              marginBottom: 20,
              display: 'flex',
            }}
          >
            <TextField
              label="New Value"
              variant="standard"
              sx={{ width: '100%' }}
              {...register('value')}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
          {!reload && <Table name={dropdown} dropdown />}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
