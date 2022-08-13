import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../../api'
import EditDropdownDialogStore from '../../store/EditDropdownDialogStore'
import Table from '../Table'

const EditDropdownDialog = observer(() => {
  const { register, handleSubmit, reset } = useForm()
  const [reload, setReload] = useState(false)

  const { opened, close, dropdown } = EditDropdownDialogStore
  const submit = async ({ value }) => {
    const { error } = await api.post(`table/${dropdown}`, { value })
    if (error) alert('Value could not be added, check if it already exist')
    else setReload(true)
    reset()
  }

  useEffect(() => {
    setReload(false)
  }, [reload])

  return (
    <div>
      <Dialog fullWidth maxWidth="xs" open={opened} onClose={close}>
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
              required
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
})

export default EditDropdownDialog
