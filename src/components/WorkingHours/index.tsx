import { Box, Checkbox, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { PaperCard } from 'components/PaperCard'
import { DayOfWeek } from 'components/WorkingHours/components/DayOfWeek'
import { useWorkingHours } from 'hooks/useWorkingHours'
import { TimeRange } from 'components/WorkingHours/components/TimeRange'
import { PriceSelector } from 'components/WorkingHours/components/PriceSelector'
import { useDefaultPricing } from 'hooks/useDefaultPricing'
import { useData } from 'hooks/useData'

export const WorkingHours = () => {
  const { workingHours, setWorkingHours } = useWorkingHours()
  const { defaultPrice } = useDefaultPricing()
  const { save, loading } = useData()

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
        [daysOfWeekName[index]]: [
          {
            start: '8:00 am',
            end: '8:00 pm',
          },
        ],
      })
    } else {
      const newWorkingHours = { ...workingHours }
      delete newWorkingHours?.[daysOfWeekName[index]]
      setWorkingHours?.(newWorkingHours)
    }
  }

  const handleAddTime = (day: string, endTime: string) => {
    let isStartAm = endTime.split(' ')[1] === 'am'
    let isEndAm = endTime.split(' ')[1] === 'am'
    let startHour = parseInt(endTime.split(':')[0]) + 1
    let endHour = startHour + 1

    if (startHour >= 12) {
      isStartAm = !isStartAm
      if (startHour > 12) {
        startHour = 1
      }
    }

    if (endHour >= 12) {
      isEndAm = !isEndAm
      if (endHour > 12) {
        endHour = 1
      }
    }

    const newWorkingHours = { ...workingHours }
    newWorkingHours[day].push({
      start: `${startHour}:00 ${isStartAm ? 'am' : 'pm'}`,
      end: `${endHour}:00 ${isEndAm ? 'am' : 'pm'}`,
    })

    setWorkingHours?.(newWorkingHours)
  }

  const handleTimeChange = (
    day: string,
    index: number,
    start: string,
    end: string
  ) => {
    const newWorkingHours = { ...workingHours }
    newWorkingHours[day][index].start = start
    newWorkingHours[day][index].end = end

    setWorkingHours?.(newWorkingHours)
  }

  const handleRemove = (day: string, index: number) => {
    const newWorkingHours = { ...workingHours }
    newWorkingHours[day].splice(index, 1)

    setWorkingHours?.(newWorkingHours)
  }

  const handleSpecialPrice = (
    day: string,
    index: number,
    price: number = parseFloat(defaultPrice ?? '0')
  ) => {
    const newWorkingHours = { ...workingHours }
    newWorkingHours[day][index].price = price

    setWorkingHours?.(newWorkingHours)
  }

  return (
    <PaperCard size={8} title="Working Hours" isMain>
      <Box>
        <Box>
          <PriceSelector />
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
          <Box>
            <Box component="ul" sx={{ padding: 0 }}>
              {daysOfWeekName.map((day) => {
                if (!workingHours?.[day]) return null

                return (
                  <Box
                    component="li"
                    sx={{
                      display: ['block', 'flex'],
                      pb: '10px',
                    }}
                    key={day}
                  >
                    <Typography
                      sx={{
                        textTransform: 'capitalize',
                        width: '100px',
                        paddingTop: '10px',
                      }}
                    >
                      {day}
                    </Typography>
                    <Box>
                      {workingHours[day].map((workingTime, index) => {
                        return (
                          <TimeRange
                            {...workingTime}
                            key={Object.keys(workingTime).join()}
                            onAdd={() => handleAddTime(day, workingTime.end)}
                            onChange={(start, end) =>
                              handleTimeChange(day, index, start, end)
                            }
                            specialPrice={workingHours[day][index].price}
                            deletable={index > 0}
                            onRemove={() => handleRemove(day, index)}
                            onAddSpecialPrice={(value?: number) =>
                              handleSpecialPrice(day, index, value)
                            }
                          />
                        )
                      })}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => save()}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </PaperCard>
  )
}
