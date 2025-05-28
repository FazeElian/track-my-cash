import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Router
import Router from './Router.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)
