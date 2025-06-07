import { Routes, Route } from 'react-router'
import { Login } from './pages/Login'
import { Ceremony } from './pages/Ceremony'
import { ManageCeremony } from './pages/Ceremony/ManageCeremony'
import { ExecuteCeremony } from './pages/Ceremony/ExecuteCeremony'
import { Admin } from './pages/Admin'
import { Scape } from './pages/Scape'
import { BoardGames } from './pages/BoardGames'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Ceremony" element={<Ceremony />} />
      <Route path="/Ceremony/create" element={<ManageCeremony />} />
      <Route path="/Ceremony/:id" element={<ManageCeremony />} />
      <Route path="/Ceremony/:id/execute" element={<ExecuteCeremony />} />
      <Route path="/Scape/" element={<Scape />} />
      <Route path="/BoardGame/" element={<BoardGames />} />
      <Route path="/Admin" element={<Admin />} />
      </Routes>
  )
}