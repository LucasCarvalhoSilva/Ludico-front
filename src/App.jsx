import { BrowserRouter } from 'react-router'
import { Router } from './Router'
import { CeremonyProvider } from './contexts/CeremonyContext'

function App() {
  

  return (
    <CeremonyProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CeremonyProvider>
  )
}

export default App
