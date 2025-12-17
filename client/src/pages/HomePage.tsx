import UserManagementComponent from '../components/managers/UserManagementComponent'
import HomeMenuComponent from '../components/ui/page/HomeMenuComponent'
import NavBar from '../components/ui/page/NavBar'

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <div className='flex flex-row'>
        <div className='flex-3'><HomeMenuComponent /></div>
        <div className='flex-9 p-5'>
          <UserManagementComponent />
        </div>
      </div>
    </div>
  )
}

export default HomePage