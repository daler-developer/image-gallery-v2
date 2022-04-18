import { QueryClient, QueryClientProvider } from "react-query"
import queryClient from "../utils/queryClient"
import { ReactQueryDevtools } from 'react-query/devtools'
import GlobalStyle from "../styles/GlobalStyle"
import AppWrapper from "../components/AppWrapper"

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>

      <AppWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AppWrapper>

      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
    </QueryClientProvider>
  )
}

export default MyApp
