import { Typography, Box, IconButton } from '@mui/material'
import { WorkingHours } from 'context'
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from '@mui/icons-material'
import { useWorkingHours } from 'hooks/useWorkingHours'
import { TimeSelector } from 'components/WorkingHours/components/TimeRange/components/TimeSelector'

interface Props {
  timeRange: WorkingHours
  day: string
  index: number
  isLast: boolean
  total: number
}

export const TimeRange = ({ timeRange, day, index, isLast, total }: Props) => {
  const { handleRemove, handleAddTime } = useWorkingHours()

  return (
    <Box display="flex" justifyContent="flex-end" mr="-19px" mt="4px" mb="7px">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex" alignItems="center">
          <TimeSelector timeRange={timeRange} day={day} index={index} isStart />
          <Typography fontSize="13px" color="primary.100" mx="9px" mt="-4px">
            to
          </Typography>
          <TimeSelector timeRange={timeRange} day={day} index={index} />
          <IconButton
            onClick={() => handleRemove(day, index)}
            sx={{
              opacity: total > 1 ? '1' : '0',
              ml: '-2px',
              mt: '-4px',
              svg: {
                fill: '#B5B9C6',
                width: '20px',
                height: '20px',
              },
            }}
          >
            <RemoveCircleOutlineOutlined />
          </IconButton>
        </Box>
        {isLast && (
          <Box
            display="flex"
            justifyContent="center"
            pr="32px"
            mt="-2px"
            mb="-10px"
          >
            <IconButton
              sx={{
                svg: {
                  fill: '#B5B9C6',
                  marginTop: '-3px',
                  width: '20px',
                },
              }}
              onClick={() => handleAddTime(day, timeRange.end)}
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  )
}
