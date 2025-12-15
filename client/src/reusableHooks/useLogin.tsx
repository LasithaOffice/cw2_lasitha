import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
const ADMIN_UN = import.meta.env.VITE_ADMIN_UN;
const ADMIN_PW = import.meta.env.VITE_ADMIN_PW;

export const useLogin = () => {

  const [unError, setUnError] = useState("");
  const [pwError, setPwError] = useState("");
  const navigate = useNavigate();

  const login = useCallback((uname: string, password: string) => {
    console.log("uuuuuuuuu ", ADMIN_UN)
    let hasError = false;
    setUnError("");
    setPwError("");
    if (!uname) {
      setUnError("Please enter the user name")
    }
    if (!password) {
      setPwError("Please enter the password")
    }
    if (hasError) return;
    if (uname && password) {
      if (uname == ADMIN_UN && password == ADMIN_PW) {
        toast.success("Login success!")
        navigate("/home");
      } else {
        toast.error("Login Failed!")
      }
    }
  }, [])

  return {
    login,
    unError,
    pwError
  }
}
