import { Box, Typography } from '@mui/material'
import { PaperCard } from 'components/PaperCard'

export const NextMeetings = () => {
  return (
    <PaperCard size={4} title="Next Meetings">
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="primary.50" gutterBottom>
          There are no upcoming events.
        </Typography>
      </Box>
    </PaperCard>
  )
}
