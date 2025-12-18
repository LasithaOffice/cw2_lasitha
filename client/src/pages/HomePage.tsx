import ChannelManagementComponent from '../components/managers/ChannelManagementComponent'
import PatientManagementComponent from '../components/managers/PatientManagementComponent'
import UserManagementComponent from '../components/managers/UserManagementComponent'
import HomeMenuComponent from '../components/ui/page/HomeMenuComponent'
import NavBar from '../components/ui/page/NavBar'
import { useAppSelector } from '../config/reduxStore'
import { getSection } from '../redux/slices/uiSlice'

const HomePage = () => {

  const section = useAppSelector(getSection)

  return (
    <div className='min-h-screen'>
      <NavBar />
      <div className='flex flex-row'>
        <div className='flex-3'><HomeMenuComponent /></div>
        <div className='flex-9 p-5'>
          {
            section == 'Manage System Users' ?
              <UserManagementComponent />
              :
              section == 'Manage Patients' ?
                <PatientManagementComponent />
                :
                section == 'Manage Channels' ?
                  <ChannelManagementComponent />
                  :
                  <></>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage