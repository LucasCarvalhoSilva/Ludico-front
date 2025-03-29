import { NavLink } from 'react-router'
import logo from '../../assets/headerLogo.svg'

export function Header () {
  return(
    <div className="h-20 bg-zinc-800 w-full flex justify-between items-center flex-row m-0 p-0">
      <div className="h-20 w-full flex gap-8 items-center flex-row m-0 p-0">
        <img src={logo} alt="Logo do projeto ludico" className='h-16 mx-6'/>
        <NavLink 
          to="/Admin" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          Painel Administrativo
        </NavLink>
      </div >
      <div className="h-20 w-full flex gap-8 items-center flex-row m-0 p-0">
        <NavLink 
          to="/Ceremony" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          Eventos
        </NavLink>
        <NavLink 
          to="/Scape" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          Escape
        </NavLink>
        <NavLink 
          to="/RPG" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          RPG
        </NavLink>
        <NavLink 
          to="/BoardGame" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          BoardGame
        </NavLink>
        <NavLink 
          to="/Logout" 
          className={({ isActive }) =>
            `text-3xl ${isActive ? 'text-amber-400 font-bold' : 'text-zinc-50 hover:scale-110 hover:opacity-70 transition-transform duration-300'}`
          }
        >
          Logout
        </NavLink>
      </div>
    </div>
  )
}