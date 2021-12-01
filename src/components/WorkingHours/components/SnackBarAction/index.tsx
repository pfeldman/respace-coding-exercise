import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
interface Props {
  handleClose: () => void
}

export const SnackBarAction = ({ handleClose }: Props) => {
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  )
}
