import { useContext } from 'react'
import { AppContext } from 'context'

export const useWorkingHours = () => {
  const { workingHours, setWorkingHours } = useContext(AppContext)

  return {
    workingHours,
    setWorkingHours,
  }
}
