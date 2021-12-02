import { Box, FormControlLabel, RadioGroup } from '@mui/material'
import { BasicRadio } from 'components/BasicRadio'
import { useWorkingHours } from 'hooks/useWorkingHours'

interface Props {
  isDefaultTime: boolean
  day: string
  index: number
}

export const OptionsGroup = ({ isDefaultTime, day, index }: Props) => {
  const { handleTimeChange } = useWorkingHours()
  return (
    <RadioGroup
      value={isDefaultTime ? 'defaultTime' : 'custom'}
      name="customized-radios"
    >
      <Box display="flex">
        <FormControlLabel
          value="defaultTime"
          onChange={() => handleTimeChange(day, index, '6:00 am', '12:00 am')}
          control={<BasicRadio />}
          label="6:00 am - 12:00 am"
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
          control={<BasicRadio />}
          onChange={() => handleTimeChange(day, index, '6:00 am', '11:00 pm')}
          label="Set hours"
          sx={{
            span: {
              fontSize: '12px',
              fontWeight: '400',
            },
          }}
        />
      </Box>
    </RadioGroup>
  )
}
