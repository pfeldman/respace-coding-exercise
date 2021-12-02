import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
} from '@mui/material'
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
    <FormControl fullWidth variant="outlined" sx={{ mt: '10px' }}>
      <OutlinedInput
        value={value}
        onKeyPress={handleKeyPress}
        onChange={onChange}
        fullWidth
        placeholder="0.0"
        startAdornment={
          <InputAdornment position="start">
            <Typography ml="10px">$</Typography>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Typography color="primary.300" fontSize="13px" mr="10px">
              per hour
            </Typography>
          </InputAdornment>
        }
        sx={{
          fieldset: {
            borderColor: 'primary.900',
            borderWidth: '2px',
          },
          borderRadius: '9px',
          input: {
            py: '17.5px',
            pr: '25px',
          },
        }}
      />
    </FormControl>
  )
}
