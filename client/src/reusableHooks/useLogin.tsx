import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { signIn } from '../api/auth';
import { useAppDispatch } from '../config/reduxStore';
import { setUser } from '../redux/slices/authSlice';
const ADMIN_UN = import.meta.env.VITE_ADMIN_UN;
const ADMIN_PW = import.meta.env.VITE_ADMIN_PW;

export const useLogin = () => {

  const [unError, setUnError] = useState("");
  const [pwError, setPwError] = useState("");
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const login = useCallback((userName: string, password: string) => {
    console.log("uuuuuuuuu ", ADMIN_UN)
    let hasError = false;
    setUnError("");
    setPwError("");
    if (!userName) {
      setUnError("Please enter the user name")
    }
    if (!password) {
      setPwError("Please enter the password")
    }
    if (hasError) return;
    if (userName && password) {
      setLogging(true);
      if (userName == ADMIN_UN && password == ADMIN_PW) {
        setLogging(false);
        toast.success("Login success!")
        navigate("/home");
      } else {
        signIn({
          userName,
          password
        }).then(s => {
          setLogging(false);
          dispatch(setUser(s.user))
          navigate("/home");
        }).catch(error => {
          setLogging(false);
          console.log(error)
          toast.error(error.response.data.message)
        })
      }
    }
  }, [])

  return {
    login,
    unError,
    pwError,
    logging
  }
}
