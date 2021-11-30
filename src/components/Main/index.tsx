import { Theme, ThemeProvider } from '@mui/material'
import { Layout } from 'components/Layout'
import Head from 'next/head'
import { AppContext, WorkingHours } from 'context'
import { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { useData } from 'hooks/useData'

interface Props extends AppProps {
  theme: Theme
}

export const Main = ({ theme, Component, pageProps }: Props) => {
  const { data } = useData()

  const [workingHours, setWorkingHours] = useState<
    Record<string, WorkingHours[]>
  >({})

  const [defaultPrice, setDefaultPrice] = useState('10')

  useEffect(() => {
    if (data) {
      setWorkingHours(data.workingHours)
      setDefaultPrice(data.defaultPrice)
    }
  }, [data])

  return (
    <AppContext.Provider
      value={{ workingHours, setWorkingHours, defaultPrice, setDefaultPrice }}
    >
      <ThemeProvider theme={theme}>
        <Layout>
          <div>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
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
