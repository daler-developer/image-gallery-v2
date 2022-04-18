import { QueryClient } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: false,
      staleTime: Infinity
    },
    mutations: {
      retry: false
    }
  }
})

export default queryClient
