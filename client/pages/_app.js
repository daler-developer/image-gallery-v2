import { Provider } from 'react-redux'
import GlobalStyle from "../styles/GlobalStyle"
import AppWrapper from "../components/AppWrapper"
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>

      <AppWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AppWrapper>
      
      <GlobalStyle />

    </Provider>
  )
}

export default MyApp
