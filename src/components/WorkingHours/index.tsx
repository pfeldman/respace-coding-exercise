import { Box, Checkbox, Typography } from '@mui/material'
import { PaperCard } from 'components/PaperCard'
import { DayOfWeek } from 'components/WorkingHours/components/DayOfWeek'
import { useWorkingHours } from 'hooks/useWorkingHours'

export const WorkingHours = () => {
  const { workingHours, setWorkingHours } = useWorkingHours()

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const daysOfWeekName = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const handleDayChange = (index: number, checked: boolean) => {
    if (checked) {
      setWorkingHours?.({
        ...workingHours,
        [daysOfWeekName[index]]: [],
      })
    } else {
      const newWorkingHours = { ...workingHours }
      delete newWorkingHours?.[daysOfWeekName[index]]
      setWorkingHours?.(newWorkingHours)
    }
  }

  return (
    <PaperCard size={8} title="Working Hours" isMain>
      <Box>
        <Box>
          <Typography sx={{ mb: 1.5 }} color="primary.textContrast">
            Please select which days and time are you available:
          </Typography>
          <Box>
            {daysOfWeek.map((day, index) => {
              return (
                <Checkbox
                  sx={{
                    marginRight: '-10px',
                  }}
                  checked={!!workingHours?.[daysOfWeekName[index]]}
                  onChange={(e) => handleDayChange(index, e.target.checked)}
                  key={`${day}${index}`}
                  icon={<DayOfWeek day={day} />}
                  checkedIcon={<DayOfWeek day={day} checked />}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
    </PaperCard>
  )
}
