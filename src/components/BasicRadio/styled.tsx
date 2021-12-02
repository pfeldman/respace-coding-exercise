import { styled } from '@mui/material/styles'

// eslint-disable-next-line
export const BpIcon = styled<any>('span')(({ size }) => ({
  borderRadius: '50%',
  width: size,
  height: size,
  border: '1px solid #E6E9ED',
}))

// eslint-disable-next-line
export const BpCheckedIcon = styled<any>(BpIcon)(({ size }) => ({
  border: '0.5px solid #3B71FE',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: size - 4,
    height: size - 4,
    backgroundColor: '#3B71FE',
    borderRadius: '100%',
    content: '""',
    marginLeft: 2,
    marginTop: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#3B71FE',
  },
}))
