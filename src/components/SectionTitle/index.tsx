import { Box, Typography } from '@mui/material'

interface Props {
  title: string
  subtitle?: string
  special?: boolean
}

export const SectionTitle = ({ title, subtitle, special }: Props) => {
  return (
    <Box display="flex" ml={special ? '0' : '7px'}>
      <Typography
        fontWeight="500"
        color="primary.contrastText"
        fontSize={special ? '18px' : '17px'}
        fontFamily={special ? 'Outfit' : 'Roboto'}
      >
        {title}
      </Typography>
      <Typography
        color="primary.dark"
        letterSpacing="-0.1px"
        ml="13px"
        fontFamily="Outfit"
        fontWeight="300"
      >
        {subtitle}
      </Typography>
    </Box>
  )
}
