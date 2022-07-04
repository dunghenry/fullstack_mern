import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import Loading from '../../components/global/Loading'
import { useAppSelector } from '../../store/hooks'
const Register = () => {
  const {loading} = useAppSelector((state) => state.auth);
  return (
    <div className="flex mt-5 items-center justify-center min-h-[calc(10vh-6rem)]">
      <div className="container max-w-md p-12 shadow-xl">
        <h2 className="my-3 text-2xl font-semibold text-center">
          REGISTER
        </h2>
        <RegisterForm />
        <div className="text-right">
          You already have an account ?<Link to="/login" className="text-blue-500 underline hover:underline"> Login</Link>
        </div>
      </div>
      {loading && <Loading/>}
    </div>
  )
}

export default Register