import { useState, MouseEvent } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface Props {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleToggle = (event?: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl || !event ? null : event.currentTarget)
  }

  const handleClose = () => {
    handleToggle()
  }

  return (
    <Box sx={{ fontFamily: 'Roboto' }}>
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" component="div">
            ExpertzRUs
          </Typography>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            a: {
              textDecoration: 'none',
              color: 'secondary.contrastText',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/">Provider</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/seeker">Seeker</Link>
          </MenuItem>
        </Menu>
      </AppBar>
      <Box mt="60px">{children}</Box>
    </Box>
  )
}
