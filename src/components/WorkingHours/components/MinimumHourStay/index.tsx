import { Box, FormControlLabel, RadioGroup } from '@mui/material'
import { BasicRadio } from 'components/BasicRadio'

export const MinimumHourStay = () => {
  return (
    <Box ml="10px">
      <RadioGroup>
        <Box display="flex">
          <FormControlLabel
            value="defaultTime"
            control={<BasicRadio radioSize={17} />}
            label="Yes"
            sx={{
              mr: '40px',
              span: {
                fontSize: '12px',
                fontWeight: '400',
              },
            }}
          />
          <FormControlLabel
            value="custom"
            control={<BasicRadio radioSize={17} />}
            label="No"
            sx={{
              span: {
                fontSize: '12px',
                fontWeight: '400',
              },
            }}
          />
        </Box>
      </RadioGroup>
    </Box>
  )
}
