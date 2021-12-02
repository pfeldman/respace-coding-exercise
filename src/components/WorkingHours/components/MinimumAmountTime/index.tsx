import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material'

export const MinimumAmountTime = () => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{ ml: '20px', width: '188px' }}
    >
      <OutlinedInput
        placeholder="30"
        endAdornment={
          <InputAdornment position="start">
            <Typography ml="10px">min</Typography>
          </InputAdornment>
        }
        sx={{
          fieldset: {
            borderColor: 'primary.900',
            borderWidth: '2px',
          },
          borderRadius: '9px',
          input: {
            py: '12px',
            pr: '35px',
          },
        }}
      />
    </FormControl>
  )
}
