import { createContext } from 'react'

export interface WorkingHours {
  start: string
  end: string
}

interface Context {
  workingHours?: Record<string, WorkingHours[]>
  setWorkingHours?: (data: Record<string, WorkingHours[]>) => void
}

export const AppContext = createContext<Context>({})
