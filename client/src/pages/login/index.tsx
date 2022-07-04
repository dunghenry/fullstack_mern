import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import Loading from '../../components/global/Loading'
import { useAppSelector } from '../../store/hooks'
const Login = () => {
  const {loading} = useAppSelector((state) => state.auth);
  return (
    <div className="flex items-center mt-10 justify-center min-h-[calc(10vh-6rem)]">
    <div className="container max-w-md p-12 shadow-xl">
      <h2 className="my-3 text-2xl font-semibold text-center">
        LOGIN
      </h2>
      <LoginForm />
      <div className="text-right">
        You already have an account ?&nbsp;<Link to="/register" className="text-blue-500 underline hover:underline">Register</Link>
      </div>
    </div>
    {loading && <Loading/>}
  </div>
  )
}

export default Login