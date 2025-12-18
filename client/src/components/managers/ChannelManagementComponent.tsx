import { useEffect, useState } from "react"
import CreateChannel from "../reusableForms/CreateChannel"
import BigButton from "../ui/single/BigButton"
import ChannelList from "../reusableLists/ChannelList"
import { useAppSelector } from "../../config/reduxStore"
import { currentUser } from "../../redux/slices/authSlice"
import ChannelViewer from "../reusableForms/ChannelViewer"
import type { Channel } from "../../interfaces/Channel"
import { showHideModel } from "../../utils/modelFunc"

const ChannelManagementComponent = () => {

  const user = useAppSelector(currentUser)
  const [section, setSection] = useState<"create" | "load">(user?.userType != 'doctor' ? "create" : 'load')

  const [channel, setChannel] = useState<Channel>()
  const [trigger, setTrigger] = useState(0)
  useEffect(() => {
    if (channel) {
      if (user?.userType == 'doctor') {
        showHideModel('channel_viewer', true)
      }
    }
  }, [channel])

  return (
    <div>
      <h1 className='text-4xl'>Channel Management</h1>
      <div className='flex mt-10'>
        {
          user?.userType != 'doctor' &&
          <div className="flex flex-col flex-1 pr-5 border-r-2 ">
            <BigButton selected={section == 'create'} text={"Create Channel"} onClick={() => {
              setSection("create")
            }} />
            <BigButton selected={section == 'load'} mt={2} text={"Load Channel"} onClick={() => {
              setSection("load")
            }} />
          </div>
        }
        <div className="flex-3 justify-center px-10 h-full">
          {
            (section == 'create') ?
              <CreateChannel />
              :
              <ChannelList reloadKey={trigger} setChannel={setChannel} />
          }
        </div>
        <ChannelViewer setCTrigger={setTrigger} channel={channel} setChanel={setChannel} />
      </div>
    </div>
  )
}

export default ChannelManagementComponent