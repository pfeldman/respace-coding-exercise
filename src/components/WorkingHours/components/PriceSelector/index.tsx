import { useDefaultPricing } from 'hooks/useDefaultPricing'
import { Box, Typography } from '@mui/material'
import { PriceTextField } from 'components/PriceTextField'

export const PriceSelector = () => {
  const { defaultPrice, setDefaultPrice } = useDefaultPricing()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      <Typography>Please enter the default hour rate:</Typography>
      <PriceTextField
        value={defaultPrice}
        onChange={(e) => setDefaultPrice?.(e.target.value)}
      />
    </Box>
  )
}
