import { Box } from '@mui/material'

interface Props {
  day: string
  checked?: boolean
}

export const DayOfWeek = ({ day, checked }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: '100%',
        backgroundColor: checked ? 'primary.dark' : 'action.disabled',
        color: checked ? 'primary.contrastText' : 'secondary.200',
        width: '20px',
        height: '20px',
        fontSize: '10px',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {day}
    </Box>
  )
}
