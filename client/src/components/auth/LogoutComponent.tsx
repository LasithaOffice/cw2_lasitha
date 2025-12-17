import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../config/reduxStore';
import Button from '../ui/single/Button';
import { useNavigate } from 'react-router';
import { currentUser, logout } from '../../redux/slices/authSlice';

const LogoutComponent = () => {

  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout_ = useCallback(() => {
    dispatch(logout())
    navigate("/");
  }, [])


  return (
    user &&
    <div className="flex justify-end flex-1">
      <Button text="Logout" onClick={logout_} />
    </div>
  )
}

export default LogoutComponent