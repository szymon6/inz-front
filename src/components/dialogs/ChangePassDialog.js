import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import api from "api"
import { observer } from "mobx-react-lite"
import { useForm } from "react-hook-form"
import DialogStore from "store/DialogStore"

const ChangePassDialog = observer(() => {
  const { register, handleSubmit, reset } = useForm()
  const { dialog, close } = DialogStore

  const onSubmit = async ({ oldPass, newPass, newPass2 }) => {
    if (newPass !== newPass2) {
      alert("new passwords don't match")
      return
    }
    const { error } = await api.post(`auth/change-pass`, {
      oldPass,
      newPass,
    })

    console.log(error)

    if (error?.status == "401") alert("bad password")
    else if (error) alert("error")
    else if (!error) {
      close()
      alert("password changed")
    }
    reset()
  }

  return (
    <div>
      <Dialog open={dialog == "changePass"} onClose={close}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              autoFocus
              label="Old password"
              fullWidth
              type="password"
              variant="standard"
              {...register("oldPass")}
            />
            <TextField
              label="New password"
              fullWidth
              type="password"
              variant="standard"
              {...register("newPass")}
            />
            <TextField
              label="Repeat new password"
              fullWidth
              type="password"
              variant="standard"
              {...register("newPass2")}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
})

export default ChangePassDialog
