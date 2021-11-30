import { Typography, Box, IconButton } from '@mui/material'
import { TimeSelector } from './components/TimeSelector'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { WorkingHours } from 'context'

interface Props extends WorkingHours {
  onAdd: () => void
  onChange: (start: string, end: string) => void
  deletable: boolean
  onRemove: () => void
}

export const TimeRange = ({
  start,
  end,
  onAdd,
  onChange,
  deletable,
  onRemove,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: '1',
        alignItems: 'center',
        ml: 2,
        '*': {
          flexGrow: '1',
        },
      }}
    >
      <TimeSelector value={start} onChange={(start) => onChange(start, end)} />
      <Typography
        sx={{
          mx: '10px',
        }}
      >
        To
      </Typography>
      <TimeSelector value={end} onChange={(end) => onChange(start, end)} />
      <IconButton edge="start" sx={{ ml: 1 }} onClick={onAdd}>
        <AddCircleOutline sx={{ color: 'primary.contrastText' }} />
      </IconButton>
      <IconButton
        edge="start"
        sx={{ ml: 0.1 }}
        onClick={onRemove}
        disabled={!deletable}
      >
        <RemoveCircleOutline
          sx={{ color: deletable ? 'primary.contrastText' : 'primary.50' }}
        />
      </IconButton>
    </Box>
  )
}
