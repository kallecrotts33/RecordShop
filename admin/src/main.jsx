import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppUser from './App.jsx'
import ListRecords from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListRecords />
  </StrictMode>,
)