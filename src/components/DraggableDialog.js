import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Table from './Table'

export default function EditDropdownDialog({ close }) {
  return (
    <div>
      <Dialog open={true} onClose={close}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Table name="role" dropdown />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
