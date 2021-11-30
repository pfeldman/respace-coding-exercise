import { TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent } from 'react'

interface Props {
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const PriceTextField = ({ value, onChange }: Props) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e.key.match(/([0-9]|\.)*/)?.[0]) {
      e.preventDefault()
    }
  }

  return (
    <TextField
      value={value}
      onKeyPress={handleKeyPress}
      onChange={onChange}
      sx={{
        ml: 2,
        '.MuiFormHelperText-root': {
          textShadow: '0px 0px 7px white',
        },
        '.MuiOutlinedInput-root': {
          backgroundColor: 'primary.contrastText',
          paddingLeft: '15px',
          '&::before': {
            position: 'absolute',
            content: "'$'",
            color: 'secondary.contrastText',
            zIndex: 1,
            top: '50%',
            transform: 'translateY(-50%)',
            left: '10px',
          },
        },
      }}
    />
  )
}
