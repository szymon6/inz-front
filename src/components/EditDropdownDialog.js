import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Table from './Table'

export default function EditDropdownDialog({ dropdown, close }) {
  return (
    <div>
      <Dialog fullWidth maxWidth="xs" open={true} onClose={close}>
        <DialogContent>
          <Table name={dropdown} dropdown />
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
