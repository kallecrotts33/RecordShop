import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ListRecords from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListRecords />
  </StrictMode>,
)