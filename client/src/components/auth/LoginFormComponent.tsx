import { useState } from 'react'
import TextInput from '../ui/single/TextInput'
import { useLogin } from '../../reusableHooks/useLogin';

const LoginFormComponent = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, unError, pwError, logging } = useLogin();

  return (
    <div className='w-full items-center justify-center flex mt-20'>
      <div className='w-100 items-center bg-base-200 p-10'>
        <h1 className='text-primary text-2xl'>Login</h1>
        <TextInput type='email' mt={4} placeHolder='your user name' setText={setUserName} text={userName} title={"User name"} error={unError} />
        <TextInput type='password' mt={1} placeHolder='account password' setText={setPassword} text={password} title={"Password"} error={pwError} />
        <div className='flex justify-end'>
          <button className="btn mt-5 btn-primary text-black" onClick={() => {
            login(userName, password)
          }}>
            {
              logging &&
              <span className="loading loading-spinner"></span>
            }
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginFormComponent