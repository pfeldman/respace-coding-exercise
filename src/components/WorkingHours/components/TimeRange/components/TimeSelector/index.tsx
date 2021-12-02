import { Box, MenuItem, Select } from '@mui/material'
import { useWorkingHours } from 'hooks/useWorkingHours'
import { WorkingHours } from 'context'
import { KeyboardArrowDown } from '@mui/icons-material'

interface Props {
  timeRange: WorkingHours
  day: string
  index: number
  isStart?: boolean
}

const Icon = () => {
  return (
    <Box
      border="2px solid"
      borderRadius="100%"
      width="12px"
      height="12px"
      borderColor="primary.main"
      mt="-4px"
      mr="10px"
      display="flex"
      justifyContent="center"
      alignContent="center"
      sx={{
        svg: {
          width: '12px !important',
          height: '12px !important',
        },
      }}
    >
      <KeyboardArrowDown />
    </Box>
  )
}

export const TimeSelector = ({ timeRange, day, index, isStart }: Props) => {
  const times = new Array(24).fill(null)
  const { handleTimeChange } = useWorkingHours()

  const selectStyles = {
    '.MuiSelect-select': {
      width: '77px',
      p: '4px 0px 4px 16px !important',
      fontSize: '13px',
      color: 'primary.100',
      mt: '-5px',
    },
    legend: {
      display: 'none',
    },
    fieldset: {
      borderColor: 'primary.800',
      borderRadius: '12px',
    },
  }

  return (
    <Select
      value={timeRange.start}
      onChange={(e) =>
        handleTimeChange(
          day,
          index,
          isStart ? e.target.value : timeRange.start,
          isStart ? timeRange.end : e.target.value
        )
      }
      sx={selectStyles}
      IconComponent={Icon}
    >
      {times.map((_, index) => {
        const isAm = index < 12
        const hour = index === 0 ? 12 : index > 12 ? index - 12 : index
        return (
          <MenuItem key={index} value={`${hour}:00 ${isAm ? 'am' : 'pm'}`}>
            {hour}:00 {isAm ? 'am' : 'pm'}
          </MenuItem>
        )
      })}
    </Select>
  )
}
