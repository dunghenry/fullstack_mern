import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
const Navbar = () => {
  const {user} = useAppSelector(state => state.auth);
  return (
    <div>
      {!user && <><Link to="/login">
        <button className="px-5 text-white py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px] mr-4">Login</button>
      </Link>
      <Link to="/register">
        <button className="text-20 text-white px-5 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]">Register</button>
      </Link></>}
      { user && (<button className="text-20 px-2 text-white mx-4 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]">LogOut</button>)}
      {/* {loading && <Loading/>} */}
    </div>
  )
}

export default Navbar
