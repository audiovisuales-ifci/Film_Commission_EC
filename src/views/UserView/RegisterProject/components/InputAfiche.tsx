import { Card, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Image } from '../../../../types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../Redux/store'
import { setNotification } from '../../../../Redux/notificationReducer'
import { styled } from '@mui/material/styles'
import UploadButton from '../../../../components/Buttons/UploadButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { editFile } from '../../../../Redux/audiovisualProjectReducer'
import styles from '../RegisterProject.module.css'

interface InputAficheProps {
  projectId: string
  afiche: Image
}

const InputAfiche: React.FC<InputAficheProps> = ({ projectId, afiche }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const handleChangeFile = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(false)
    if (!target.files) {
      return
    }
    const selectedFile = target.files[0]
    const maxSizeInBytes = 5 * 1024 * 1024

    if (selectedFile.size > maxSizeInBytes) {
      dispatch(
        setNotification({
          style: 'error',
          text: 'El archivo pesa más de 5mb',
        }),
      )
      return
    }
    setFile(selectedFile)
    setFilename(selectedFile.name)
  }

  const handleUploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!file) {
      dispatch(
        setNotification({
          style: 'error',
          text: 'No se ha seleccionado ningún archivo',
        }),
      )
    }

    const formData = new FormData()
    if (file) {
      formData.append('afiche', file)
    }
    if (projectId) {
      formData.append('projectId', projectId)
    }

    try {
      await dispatch(editFile(formData))
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.editImagesContainer}>
      <form onSubmit={handleUploadFile} encType="multipart/form-data">
        <Typography variant="h5">Afiche</Typography>
        <Typography variant="body2">Debe pesar máximo 5mb.</Typography>
        <Typography variant="body1">Seleccionar archivo:</Typography>
        <span>
          <Typography>
            {file ? filename : 'No se ha seleccionado ningún archivo'}
          </Typography>
          <Button
            component="label"
            variant="contained"
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Seleccionar afiche
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .png, .webp"
              onChange={handleChangeFile}
            />
          </Button>
        </span>
        <span>
          <UploadButton loading={loading} success={success} type="submit" />
          <Typography variant="body1">Guardar imagen</Typography>
        </span>
      </form>
      <Card>
        {afiche && afiche.url && afiche.url.trim() !== '' ? (
          <img src={afiche.url} />
        ) : (
          <Typography>No tiene un afiche guardada</Typography>
        )}
      </Card>
    </div>
  )
}

export default InputAfiche
