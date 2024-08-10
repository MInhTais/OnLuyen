import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { MyProvider } from './context/MyProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MyProvider } from './context/MyProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MyProvider>
          {/* <Provider store={store}> */}
          <App />
          {/* </Provider> */}
        </MyProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
