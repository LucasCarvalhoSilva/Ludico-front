import { Routes, Route } from 'react-router'
import { Login } from './pages/Login'
import { Ceremony } from './pages/Ceremony'
import { NewCeremony } from './pages/NewCeremony'
import { CeremonyHome } from './pages/CeremonyHome'

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Ceremony" element={<Ceremony />} />
        <Route path="/Ceremony/NewCeremony" element={<NewCeremony />} />
        <Route path="/Ceremony/:id" element={<CeremonyHome />} />
    </Routes>
  )
}