import { Typography } from '@mui/material'

interface Props {
  title: string
  subtitle: string
}

export const MainTitle = ({ title, subtitle }: Props) => {
  return (
    <>
      <Typography
        fontWeight="bold"
        fontSize="29px"
        component="h1"
        color="primary.200"
        sx={{
          mb: '3px',
        }}
      >
        {title}
      </Typography>
      <Typography color="primary.dark" fontSize="0.906rem" fontWeight="300">
        {subtitle}
      </Typography>
    </>
  )
}
