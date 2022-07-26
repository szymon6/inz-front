import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Table from './Table';

export default function EditDropdownDialog({ dropdown, close }) {
  return (
    <div>
      <Dialog fullWidth maxWidth="xs" open={true} onClose={close}>
        <DialogContent>
          <form
            style={{
              marginBottom: 20,
              display: 'flex',
            }}
          >
            <TextField
              label="New Value"
              variant="standard"
              sx={{ width: '100%' }}
            />
            <Button variant="contained" color="primary">
              Add
            </Button>
          </form>
          <Table name={dropdown} dropdown />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
