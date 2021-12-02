import { Box, Typography } from '@mui/material'
import { useWorkingHours } from 'hooks/useWorkingHours'
import { TimeRange } from 'components/WorkingHours/components/TimeRange'
import { PriceSelector } from 'components/WorkingHours/components/PriceSelector'
import { DAYS_WEEK_NAME } from 'resources/constants'
import { SectionTitle } from 'components/SectionTitle'
import { BasicSwitch } from 'components/BasicSwitch'
import { OptionsGroup } from 'components/WorkingHours/components/OptionsGroup'
import { MinimumHourStay } from 'components/WorkingHours/components/MinimumHourStay'
import { MinimumAmountTime } from 'components/WorkingHours/components/MinimumAmountTime'

export const WorkingHours = () => {
  const { workingHours, handleDayChange } = useWorkingHours()

  return (
    <Box mt="52px">
      <SectionTitle
        title="Set your price"
        subtitle="How much you want to charge per hour?"
      />
      <PriceSelector />
      <Box>
        <SectionTitle title="Set the availability" />
        <Box component="ul" p="0" mt="12px" ml="-1px">
          {DAYS_WEEK_NAME.map((day, index) => {
            const isDefaultTime =
              workingHours?.[day]?.length === 1 &&
              workingHours?.[day][0].start === '6:00 am' &&
              workingHours?.[day][0].end === '12:00 am'
            return (
              <Box
                key={day}
                border="2px solid"
                borderColor="primary.900"
                p="6.5px 31px"
                mb="16px"
                borderRadius="9px"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexWrap={['wrap', 'nowrap']}
                >
                  <Typography
                    fontSize="16.5px"
                    sx={{
                      width: '104px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {day}
                  </Typography>
                  <BasicSwitch
                    checked={!!workingHours?.[day]}
                    onChange={(e) => handleDayChange(index, e.target.checked)}
                  />
                  <Box
                    ml="56px"
                    display={!!workingHours?.[day] ? 'block' : 'none'}
                  >
                    <OptionsGroup
                      isDefaultTime={isDefaultTime}
                      day={day}
                      index={index}
                    />
                  </Box>
                </Box>
                {!isDefaultTime &&
                  workingHours?.[day]?.map((timeRange, index) => (
                    <TimeRange
                      key={index}
                      total={workingHours?.[day].length}
                      isLast={index === workingHours?.[day].length - 1}
                      timeRange={timeRange}
                      day={day}
                      index={index}
                    />
                  ))}
              </Box>
            )
          })}
        </Box>
        <Box display="flex" mt="50px" alignItems="center">
          <SectionTitle
            title="Do you want to set a minimum hour per stay?"
            special
          />
          <MinimumHourStay />
        </Box>
        <Box display="flex" mt="50px" alignItems="center" mb="50px">
          <SectionTitle
            title="Set a minimum amount of time required between reservations?"
            special
          />
          <MinimumAmountTime />
        </Box>
      </Box>
    </Box>
  )
}
