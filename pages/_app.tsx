import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Main } from 'components/Main'
import 'resources/basicStyles.css'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      light: '#fcfcfd',
      main: '#E6E9ED',
      dark: '#908E8E',
      contrastText: '#3A3334',
      100: '#23262F',
      200: '#3B3637',
      300: '#363945',
      700: '#C1C4CF',
      800: '#E6E8EC',
      900: '#F4F5F6',
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
