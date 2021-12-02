import { useDefaultPricing } from 'hooks/useDefaultPricing'
import { Box } from '@mui/material'
import { PriceTextField } from 'components/PriceTextField'

export const PriceSelector = () => {
  const { defaultPrice, setDefaultPrice } = useDefaultPricing()

  return (
    <Box
      sx={{
        mb: '45px',
      }}
    >
      <PriceTextField
        value={defaultPrice}
        onChange={(e) => setDefaultPrice?.(e.target.value)}
      />
    </Box>
  )
}
