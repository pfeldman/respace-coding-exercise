import type { NextPage } from 'next'
import { Box } from '@mui/material'
import { WorkingHours } from 'components/WorkingHours'
import { MainTitle } from 'components/MainTitle'

const Home: NextPage = () => {
  return (
    <Box
      maxWidth={['100%', '1200px']}
      mx="auto"
      width="100%"
      px={['2px', '234px']}
      sx={{
        boxSizing: 'border-box',
      }}
    >
      <MainTitle
        title="Pricing & Availability"
        subtitle="What are your operating hours and price per hour?"
      ></MainTitle>
      <WorkingHours />
    </Box>
  )
}

export default Home
