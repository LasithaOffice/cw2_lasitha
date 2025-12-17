import LogoutComponent from "../../auth/LogoutComponent";

const NavBar = () => {

  return (
    <header className='bg-base-300'>
      <div className='mx-auto p-4'>
        <div className='flex items-center'>
          <img src='/icon.webp' width={50} height={50} className='mr-4' />
          <h1 className='text-3xl font-bold text-white font-mono tracking-tighter'>ABC Hospital</h1>
          <LogoutComponent />
        </div>
      </div>
    </header>
  )
}

export default NavBar