import React from 'react'
import NavBar from '../components/ui/page/NavBar'
import LoginUI from '../components/ui/auth/LoginUI'

const LoginPage = () => {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <LoginUI />
    </div>
  )
}

export default LoginPage