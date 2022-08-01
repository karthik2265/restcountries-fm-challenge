import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Fragment } from 'react'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  )
}

export default MyApp
