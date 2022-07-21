import { customAxios } from '../../store/api'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Loading from '../global/Loading';
import { loginSuccess } from '../../store/slices/authSlice';
import { logout } from '../../store/actions/auth';
import { AxiosInstance } from 'axios';
const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector(state => state.auth);
  let id : string | undefined;
  let axios : AxiosInstance;
  let accessToken: string;
  if(user){
    id = user?._id
    accessToken = user?.accessToken
    axios = customAxios(user, dispatch, loginSuccess)
  }
  const handleLogout = () => {
    if(id){
      logout(id, dispatch, navigate, axios, accessToken);
    }
  }
  return (
    <div>
      {!user && <><Link to="/login">
        <button className="px-5 text-white py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px] mr-4">Login</button>
      </Link>
        <Link to="/register">
          <button className="text-20 text-white px-5 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]">Register</button>
        </Link></>}
      {user && (<button className="text-20 px-2 text-white mx-4 py-2 bg-purple-500 hover:bg-pink-400 transition-all duration-300 hover:text-black font-bold rounded-[8px]" onClick={handleLogout}>LogOut</button>)}
      {loading && <Loading />}
    </div>
  )
}

export default Navbar
