import ChannelManagementComponent from '../components/managers/ChannelManagementComponent'
import PatientManagementComponent from '../components/managers/PatientManagementComponent'
import PaymentManagementComponent from '../components/managers/PaymentManagementComponent copy'
import PriceManagementComponent from '../components/managers/PriceManagementComponent'
import UserManagementComponent from '../components/managers/UserManagementComponent'
import RevenueAndReport from '../components/reusableForms/RevenueAndReport'
import ScanRequestList from '../components/reusableLists/ScanRequestList'
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
                  section == 'Manage Payments' ?
                    <PaymentManagementComponent />
                    :
                    section == 'Manage Pricing' ?
                      <PriceManagementComponent />
                      :
                      section == 'Manage ScanRequests' ?
                        <ScanRequestList />
                        :
                        section == 'Revenue & Report' ?
                          <RevenueAndReport />
                          :
                          <></>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage