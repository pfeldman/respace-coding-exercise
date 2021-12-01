import { Box, Typography, Avatar } from '@mui/material'
import { PaperCard } from 'components/PaperCard'
import { useTurns } from 'hooks/useTurns'
import { getDateParts } from 'utils/time'

export const NextMeetings = () => {
  const { data } = useTurns()

  return (
    <PaperCard size={4} title="Next Meetings">
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: !data?.turnsTaken.length ? 'center' : 'flex-start',
          justifyContent: !data?.turnsTaken.length ? 'center' : 'flex-start',
        }}
      >
        {!data?.turnsTaken.length && (
          <Typography sx={{ fontSize: 14 }} color="primary.50" gutterBottom>
            There are no upcoming events.
          </Typography>
        )}
        {data?.turnsTaken.map((turn, index) => {
          const { month, day, year, hours } = getDateParts(turn.time)
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar>{turn.takenBy.substring(0, 1).toUpperCase()}</Avatar>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography>{turn.takenBy}</Typography>
                <Typography fontSize="12px">
                  {month}-{day}-{year} {hours}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
    </PaperCard>
  )
}
