import React from 'react'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { store } from '../stores/store'
import { Provider } from 'react-redux'
import '../css/main.css'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const title = `BK Hospital Management System`

  const description = 'BK Hospital Management System by HCMUT Students of Faculty of Computer Science and Engineering.'

  const imageWidth = '1920'

  const imageHeight = '960'

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:width" content={imageWidth} />
            <meta property="twitter:image:height" content={imageHeight} />

            <link rel="icon" href="/favicon.svg" />
          </Head>


          <Component {...pageProps} />
        </>
      )}
    </Provider>
  )
}

export default MyApp
