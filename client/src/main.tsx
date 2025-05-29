import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// Global styles
import "./assets/css/Global.css";

// Router
import Router from './Router.tsx'

// Query client - React query
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
      <ReactQueryDevtools />
    </BrowserRouter>
  </QueryClientProvider>
)
