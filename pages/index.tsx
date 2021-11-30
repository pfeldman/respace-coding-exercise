import type { NextPage } from 'next'
import { Grid } from '@mui/material'
import { NextMeetings } from 'components/NextMeetings'
import { WorkingHours } from 'components/WorkingHours'

const Home: NextPage = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <NextMeetings />
        <WorkingHours />
      </Grid>
    </div>
  )
}

export default Home
