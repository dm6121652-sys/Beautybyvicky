import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Defensive global: some deployed bundles referenced a missing `rounded` identifier.
// Define it globally to avoid runtime ReferenceErrors until the root cause is fully cleared.
if (typeof window !== 'undefined' && typeof window.rounded === 'undefined') {
  window.rounded = 0
}
console.log('App starting...')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
