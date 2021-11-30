import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from 'components/Layout'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { AppContext, WorkingHours } from 'context'
import { useState } from 'react'

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

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [workingHours, setWorkingHours] = useState<
    Record<string, WorkingHours[]>
  >({})

  return (
    <AppContext.Provider value={{ workingHours, setWorkingHours }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <div>
            <Head>
              <title>ExpertzRUs</title>
              <meta name="description" content="ExpertzRUs Demo App" />
              <link rel="icon" href="/favicon.ico" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin=""
              />
              {/* eslint-disable-next-line */}
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;0,900;1,400&display=swap"
                rel="stylesheet"
              />
            </Head>
            <Component {...pageProps} />
          </div>
        </Layout>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export default MyApp
