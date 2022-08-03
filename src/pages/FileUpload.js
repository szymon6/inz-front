import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api'

const FileUpload = () => {
  const { register, handleSubmit, reset } = useForm()

  const [error, setError] = useState(null)
  const onSubmit = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.name.endsWith('.csv')) {
      setError('format must be .csv')
      return
    }

    send(file)
    setError(null)
  }

  const send = async (file) => {
    const formData = new FormData()
    formData.append('spreadsheet', file)

    const { error } = await api.post(
      'file/upload',
      formData,
      'multipart/form-data'
    )
    if (error) {
      setError('error, file not uploaded')
      return
    }
    reset()
    alert('File successfully uploaded ')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="file" {...register('fileList')} accept=".csv" required />
        <br /> <br />
        {error && (
          <Alert sx={{ mb: 2 }} severity="error">
            {error}
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </div>
  )
}

export default FileUpload
