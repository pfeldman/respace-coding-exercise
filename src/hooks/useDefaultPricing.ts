import { useContext } from 'react'
import { AppContext } from 'context'

export const useDefaultPricing = () => {
  const { defaultPrice, setDefaultPrice } = useContext(AppContext)

  return {
    defaultPrice,
    setDefaultPrice,
  }
}
