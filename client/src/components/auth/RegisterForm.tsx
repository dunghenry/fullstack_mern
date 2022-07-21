import './styles.scss';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { register } from '../../store/actions/auth';
import { IFormRegister } from '../../types';
const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {handleChange, values, errors, handleSubmit} = useFormik<IFormRegister>({
        initialValues:{
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required").min(7, "Must be 7 characters or more"),
            password: Yup.string().required("Required").matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,15}$/, "Password must be 7-15 characters and contain at least one letter, one number and a special character"),
            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Password must match")
        }),
        onSubmit: (values: IFormRegister):void => {
            const user = {username: values.username, password: values.password};
            register(user, dispatch, navigate);
        }
    })
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label htmlFor="username" className="font-bold">User Name :</label>
                <input type="text" value={values.username} onChange={handleChange} id="username" placeholder="Enter username..." className="w-full p-1.5 border mt-2" />
                {errors.username && <p className="errorMsg">{errors.username}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="font-bold">Password :</label>
                <input type="password" value={values.password} onChange={handleChange} id="password" placeholder="Enter password..." className="w-full p-1.5 border mt-2" />
                {errors.password && <p className="errorMsg">{errors.password}</p>}
            </div>
            <div className="mb-2">
                <label htmlFor="confirmPassword" className="font-bold">Confirm Password :</label>
                <input type="password" value={values.confirmPassword} onChange={handleChange}id="confirmPassword" placeholder="Confirm password..." className="w-full p-1.5 border mt-2" />
                {errors.confirmPassword && <p className="errorMsg">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full rounded-md p-3 my-2 font-semibold tracking-wider bg-blue-600 text-white uppercase border-2 hover:bg-purple-900">Register</button>
        </form>
    )
}

export default RegisterForm