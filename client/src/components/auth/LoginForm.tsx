import './styles.scss';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks';
import { useFormik, FormikProps } from 'formik';
import { IFormLogin } from '../../types';
import * as Yup from 'yup';
import {login} from '../../store/actions/auth';
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleChange, values, errors, handleSubmit} = useFormik<IFormLogin>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required").min(7, "Must be 7 characters or more"),
      password: Yup.string().required("Required").min(5, "Must be 5 characters or more"),
    }),
    onSubmit: (values: IFormLogin) => {
      const user = values;
      login(user, dispatch, navigate);
    },
    
  })
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="username" className="font-bold">User Name :</label>
        <input id="username" value={values.username} onChange={handleChange} placeholder="Enter username..." className="w-full p-1.5 border mt-2" />
        {errors.username && <p className="errorMsg">{errors.username}</p>}
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="font-bold">Password :</label>
        <input type="password" value={values.password} onChange={handleChange} id="password" placeholder="Enter password..." className="w-full p-1.5 border mt-2" />
        {errors.password && <p className="errorMsg">{errors.password}</p>}
      </div>
      <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Login</button>
    </form>
  )
}

export default LoginForm