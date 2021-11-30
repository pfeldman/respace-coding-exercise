import { Autocomplete, TextField } from '@mui/material'

interface Props {
  value: string
  onChange: (value: string) => void
}

export const TimeSelector = ({ value, onChange }: Props) => {
  const times = new Array(24).fill(null).map((_, index) => {
    let hour = index
    let zone = 'am'
    if (index > 12) {
      zone = 'pm'
      hour = index - 12
    }

    return {
      label: `${hour}:00 ${zone}`,
    }
  })

  return (
    <Autocomplete
      disablePortal
      options={times}
      freeSolo
      clearOnBlur
      value={value}
      onChange={(e, newValue) => {
        const value: { label?: string } = newValue as { label?: string }
        onChange(value?.label ?? '')
      }}
      sx={{ width: [50, 110] }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          sx={{
            '.MuiInput-root': {
              padding: '0 !important',
            },
            'input.MuiAutocomplete-input': {
              color: 'primary.contrastText',
              paddingLeft: '5px !important',
              maxWidth: '100% !important',
            },
            '.MuiAutocomplete-endAdornment': {
              display: 'none',
            },
          }}
        />
      )}
    />
  )
}
