import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Table from './Table'

export default function EditDropdownDialog({ close }) {
  return (
    <div>
      <Dialog open={true} onClose={close}>
        <DialogContent>
          <Table name="role" dropdown />
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
