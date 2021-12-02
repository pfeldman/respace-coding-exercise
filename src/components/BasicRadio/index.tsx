import Radio, { RadioProps } from '@mui/material/Radio'
import { BpCheckedIcon, BpIcon } from './styled'

interface Props extends RadioProps {
  radioSize?: number
}

export const BasicRadio = ({ radioSize = 12, ...props }: Props) => {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon size={radioSize} />}
      icon={<BpIcon size={radioSize} />}
      {...props}
    />
  )
}
