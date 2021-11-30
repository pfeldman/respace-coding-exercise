import { Typography, Box, IconButton, Menu, MenuItem } from '@mui/material'
import { TimeSelector } from './components/TimeSelector'
import {
  AddCircleOutline,
  RemoveCircleOutline,
  MoreVert,
} from '@mui/icons-material'
import { WorkingHours } from 'context'
import { MouseEvent, useState } from 'react'
import { PriceTextField } from 'components/PriceTextField'

interface Props extends WorkingHours {
  onAdd: () => void
  onChange: (start: string, end: string) => void
  deletable: boolean
  onRemove: () => void
  onAddSpecialPrice: (value?: number) => void
  specialPrice?: number
}

export const TimeRange = ({
  start,
  end,
  price,
  onAdd,
  onChange,
  deletable,
  onRemove,
  onAddSpecialPrice,
  specialPrice,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleToggle = (event?: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl || !event ? null : event.currentTarget)
  }

  const handleClose = () => {
    handleToggle()
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexGrow: '1',
          alignItems: 'center',
          ml: [0, 2],
          '*': {
            flexGrow: '1',
          },
        }}
      >
        <TimeSelector
          value={start}
          onChange={(start) => onChange(start, end)}
        />
        <Typography
          sx={{
            mx: '10px',
          }}
        >
          To
        </Typography>
        <TimeSelector value={end} onChange={(end) => onChange(start, end)} />
        <IconButton edge="start" sx={{ padding: 1, ml: 1 }} onClick={onAdd}>
          <AddCircleOutline sx={{ color: 'primary.contrastText' }} />
        </IconButton>
        <IconButton
          edge="start"
          sx={{ padding: 1 }}
          onClick={onRemove}
          disabled={!deletable}
        >
          <RemoveCircleOutline
            sx={{ color: deletable ? 'primary.contrastText' : 'primary.50' }}
          />
        </IconButton>
        <IconButton edge="start" sx={{ padding: 0 }} onClick={handleToggle}>
          <MoreVert sx={{ color: 'primary.contrastText' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => onAddSpecialPrice()}>
            Set a different price for this time range
          </MenuItem>
        </Menu>
      </Box>
      {price !== undefined && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '.MuiOutlinedInput-root': {
              height: '30px',
              fieldset: {
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                borderRadius: 0,
              },
            },
          }}
        >
          <Typography sx={{ whiteSpace: 'nowrap' }}>Special Price</Typography>
          <PriceTextField
            value={specialPrice ? specialPrice.toString() : undefined}
            onChange={(e) => onAddSpecialPrice(parseFloat(e.target.value))}
          />
        </Box>
      )}
    </Box>
  )
}
