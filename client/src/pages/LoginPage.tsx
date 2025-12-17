import NavBar from '../components/ui/page/NavBar'
import LoginFormComponent from '../components/auth/LoginFormComponent'

const LoginPage = () => {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <LoginFormComponent />
    </div>
  )
}

export default LoginPage