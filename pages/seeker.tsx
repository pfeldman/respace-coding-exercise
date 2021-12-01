import type { NextPage } from 'next'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  Snackbar,
} from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import { DAYS_WEEK_NAME } from 'resources/constants'
import { useData } from 'hooks/useData'
import { WorkingHours } from 'context'
import { useDefaultPricing } from 'hooks/useDefaultPricing'
import { useTurns } from 'hooks/useTurns'
import { SnackBarAction } from 'components/WorkingHours/components/SnackBarAction'
import { getDateParts } from 'utils/time'

interface Hour {
  available: boolean
  price: number
}

const Seeker: NextPage = () => {
  const { save, status, data: turns } = useTurns()

  const modalStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: [300, 400],
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [nameError, setNameError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [meetingTime, setMeetingTime] = useState(0)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [dayAvailability, setDayAvailability] = useState<Hour[]>([])
  const { defaultPrice } = useDefaultPricing()
  const { data } = useData()

  useEffect(() => {
    if (status === 'success') {
      setSnackOpen(true)
      setModalOpen(false)
      setDate('')
    }
  }, [status])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  const dayName = DAYS_WEEK_NAME[new Date(date).getDay()]

  const convertHourInto24 = (time: string) => {
    const isStartAm = time.split(' ')[1] === 'am'
    const value = parseInt(time.split(':')[0])
    return value + (isStartAm || value === 12 ? 0 : 12)
  }

  useEffect(() => {
    const getTimesFromRange = (hours: WorkingHours[]) => {
      const day = new Array(24).fill({ available: false, price: 0 })
      const dateTurns = turns?.turnsTaken.filter((turn) => {
        const turnDate = new Date(turn.time)
        const filterDate = new Date(date)

        return (
          turnDate.getFullYear() === filterDate.getFullYear() &&
          turnDate.getMonth() === filterDate.getMonth() &&
          turnDate.getDate() === filterDate.getDate()
        )
      })

      const takenTimes = dateTurns?.map((turn) =>
        new Date(turn.time).getHours()
      )

      hours.forEach((hour) => {
        const start = convertHourInto24(hour.start)
        const end = convertHourInto24(hour.end)

        for (let i = start; i <= end; i++) {
          if (!takenTimes?.includes(i)) {
            day[i] = {
              available: true,
              price: hour.price ?? parseFloat(defaultPrice ?? '0'),
            }
          }
        }
      })

      return day
    }

    if (data?.workingHours?.[dayName]) {
      const dayAvailability = getTimesFromRange(data.workingHours[dayName])

      setDayAvailability(dayAvailability)
    }
  }, [date, data, setDayAvailability, dayName, defaultPrice, turns?.turnsTaken])

  const hasAvailableTime = !!dayAvailability.find((hour) => hour.available)

  const handleChange = (date: Date) => {
    setDate(date.toISOString())
  }

  const numberToTime = (value: number) => {
    let isAm = true
    let hour = value
    if (value > 12) {
      isAm = false
      hour = value - 12
    }

    return `${hour}:00 ${isAm ? 'am' : 'pm'}`
  }

  const getDateFormatted = (dateStr: string) => {
    const { month, day, year } = getDateParts(dateStr)

    return `${month}/${day}/${year}`
  }

  const handleTakeTurn = (meetingTime: number) => {
    if (!name) {
      setNameError(true)
      return
    }

    setNameError(false)
    const { month, day, year } = getDateParts(date)

    const dateString = new Date(
      new Date(`${year}-${month}-${day} 00:00`).setHours(meetingTime)
    ).toISOString()

    save({
      takenBy: name,
      time: dateString,
    })
  }

  return (
    <Box>
      <Typography>Select a date to meet with the provider:</Typography>
      <Box>
        <DatePicker
          selected={date ? new Date(date) : null}
          onChange={handleChange}
        />
      </Box>
      {date && !hasAvailableTime && (
        <Typography
          sx={{
            fontStyle: 'italic',
            fontSize: '12px',
            color: 'secondary.200',
          }}
        >
          There are no open slots. Please try a different date.
        </Typography>
      )}

      {date && hasAvailableTime && (
        <>
          <Typography sx={{ mt: 2 }}>
            Please choose the time that better matches for you:
          </Typography>
          <Grid container spacing={2}>
            {dayAvailability.map((hour, index) => {
              if (hour.available) {
                return (
                  <Grid item xs={6} md={4} key={index}>
                    <Button
                      sx={{ width: '100%' }}
                      variant="contained"
                      onClick={() => {
                        setModalOpen(true)
                        setMeetingTime(index)
                      }}
                    >
                      {numberToTime(index)} - {numberToTime(index + 1)} -&nbsp;
                      <strong>${hour.price}</strong>
                    </Button>
                  </Grid>
                )
              }

              return null
            })}
          </Grid>
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm meeting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            You would be meeting from {numberToTime(meetingTime)} to{' '}
            {numberToTime(meetingTime + 1)} on {getDateFormatted(date)}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <TextField
              error={nameError}
              helperText={nameError ? 'You must enter a name' : undefined}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Your Name"
            />
            <Button
              variant="contained"
              onClick={() => handleTakeTurn(meetingTime)}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Your Turn was saved"
        action={<SnackBarAction handleClose={() => handleClose()} />}
      />
    </Box>
  )
}

export default Seeker
