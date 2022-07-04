import React from 'react'
import { useAppSelector } from '../../store/hooks';
import LoadingToRedirect from './LoadingToRedirect';
type IProps = {
    children: JSX.Element,
};
const PrivateRoute: React.FC<IProps> = ({ children }) => {
    const { user } = useAppSelector((state) => ({ ...state.auth }));
    return user ? children : <LoadingToRedirect />
}
export default PrivateRoute;