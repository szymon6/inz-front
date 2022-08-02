import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const FileUpload = () => {
  const { register, handleSubmit } = useForm()

  const [error, setError] = useState(null)
  const onSubmit = async ({ spreadsheet }) => {
    const file = spreadsheet[0]
    if (!file.name.endsWith('.csv')) {
      setError('format must be .csv')
      return
    }
    setError(null)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input
          type="file"
          {...register('spreadsheet')}
          accept=".csv"
          required
        />{' '}
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
