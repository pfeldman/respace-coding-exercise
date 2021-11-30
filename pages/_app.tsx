import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from 'components/Main'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
      '50': '#eeeeee70',
      '200': '#eeeeee',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
      '200': '#525252',
    },
    action: {
      active: '#1a73e8',
      disabled: '#f1f3f4',
    },
  },
})

const MyApp = (props: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main {...props} theme={theme} />
    </QueryClientProvider>
  )
}

export default MyApp
