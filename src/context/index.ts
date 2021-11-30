import { createContext } from 'react'

export interface WorkingHours {
  start: string
  end: string
  price?: number
}

interface Context {
  workingHours?: Record<string, WorkingHours[]>
  setWorkingHours?: (data: Record<string, WorkingHours[]>) => void
  defaultPrice?: string
  setDefaultPrice?: (price: string) => void
}

export const AppContext = createContext<Context>({})
