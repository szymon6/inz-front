import { Alert, CircularProgress } from "@mui/material"
import Button from "@mui/material/Button"
import api from "api"
import { useState } from "react"
import { useForm } from "react-hook-form"

const FileUploadPage = () => {
  const { register, handleSubmit, reset } = useForm()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const onSubmit = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.name.endsWith(".csv")) {
      setError("format must be .csv")
      return
    }

    send(file)
    setError(null)
  }

  const send = async (file) => {
    const formData = new FormData()
    formData.append("spreadsheet", file)

    setLoading(true)
    const { error } = await api.post(
      "file/upload",
      formData,
      "multipart/form-data"
    )
    setLoading(false)
    if (error) {
      setError("error, file not uploaded")
      return
    }
    reset()
    alert("File successfully uploaded ")
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="file" {...register("fileList")} accept=".csv" required />
        <br /> <br />
        {error && (
          <Alert sx={{ mb: 2 }} severity="error">
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Upload
        </Button>
        <br /> <br />
        {loading && <CircularProgress />}
      </form>
    </div>
  )
}

export default FileUploadPage
