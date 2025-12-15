
const NavBar = () => {
  return (
    <header className='bg-base-300'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center'>
          <img src='/icon.webp' width={50} height={50} className='mr-4' />
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>ABC Hospital</h1>
        </div>
      </div>
    </header>
  )
}

export default NavBar