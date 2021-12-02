import { SyntheticEvent, useEffect } from 'react'
import Image from 'next/image'
import { AppBar, Box, Button, Snackbar } from '@mui/material'
import { useData } from 'hooks/useData'
import { SnackBarAction } from 'components/WorkingHours/components/SnackBarAction'
import { useState } from 'react'

interface Props {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState(false)

  const { save, status } = useData()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    if (status === 'success') {
      setOpen(true)
    }
  }, [status])

  return (
    <Box sx={{ fontFamily: 'Roboto' }}>
      <AppBar
        sx={{
          boxShadow: 'none',
          pt: '15px',
          pb: '12px',
          backgroundColor: 'primary.light',
        }}
      >
        <Box
          sx={{
            maxWidth: ['100%', '1200px'],
            width: '100%',
            px: '24px',
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <Image src="/img/logo.png" alt="logo" />
          <Button
            onClick={() => save()}
            variant="outlined"
            sx={{
              mr: ['0', '57px'],
              borderRadius: '34px',
              color: 'primary.contrastText',
              textTransform: 'none',
              fontSize: '0.843rem',
              fontWeight: 'bold',
              px: '30px',
              pt: '7px',
              pb: '6px',
              borderWidth: '2px',
              borderColor: 'primary.800',
              letterSpacing: '0.6px',
            }}
          >
            Save and exit
          </Button>
        </Box>
      </AppBar>
      <Box mt="148px">{children}</Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Working Hours were saved"
        action={<SnackBarAction handleClose={() => handleClose()} />}
      />
    </Box>
  )
}
