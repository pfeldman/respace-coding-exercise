import { useContext } from 'react'
import { AppContext } from 'context'
import { DAYS_WEEK_NAME } from 'resources/constants'

export const useWorkingHours = () => {
  const { workingHours, setWorkingHours } = useContext(AppContext)

  const handleRemove = (day: string, index: number) => {
    const newWorkingHours = { ...workingHours }
    newWorkingHours[day].splice(index, 1)

    setWorkingHours?.(newWorkingHours)
  }

  const handleAddTime = (day: string, endTime: string) => {
    let isStartAm = endTime.split(' ')[1] === 'am'
    let isEndAm = endTime.split(' ')[1] === 'am'
    let startHour = parseInt(endTime.split(':')[0]) + 1
    let endHour = startHour + 1

    if (startHour >= 12) {
      isStartAm = !isStartAm
      if (startHour > 12) {
        startHour = 1
      }
    }

    if (endHour >= 12) {
      isEndAm = !isEndAm
      if (endHour > 12) {
        endHour = 1
      }
    }

    const newWorkingHours = { ...workingHours }
    newWorkingHours[day].push({
      start: `${startHour}:00 ${isStartAm ? 'am' : 'pm'}`,
      end: `${endHour}:00 ${isEndAm ? 'am' : 'pm'}`,
    })

    setWorkingHours?.(newWorkingHours)
  }

  const handleTimeChange = (
    day: string,
    index: number,
    start: string,
    end: string
  ) => {
    const newWorkingHours = { ...workingHours }
    if (newWorkingHours[day][index]) {
      newWorkingHours[day][index].start = start
      newWorkingHours[day][index].end = end

      setWorkingHours?.(newWorkingHours)
    }
  }

  const handleDayChange = (index: number, checked: boolean) => {
    if (checked) {
      setWorkingHours?.({
        ...workingHours,
        [DAYS_WEEK_NAME[index]]: [{ start: '6:00 am', end: '12:00 am' }],
      })
    } else {
      const newWorkingHours = { ...workingHours }
      delete newWorkingHours?.[DAYS_WEEK_NAME[index]]
      setWorkingHours?.(newWorkingHours)
    }
  }

  return {
    workingHours,
    setWorkingHours,
    handleRemove,
    handleAddTime,
    handleTimeChange,
    handleDayChange,
  }
}
