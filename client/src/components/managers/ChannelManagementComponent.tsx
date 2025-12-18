import { useState } from "react"
import CreateChannel from "../reusableForms/CreateChannel"
import BigButton from "../ui/single/BigButton"

const ChannelManagementComponent = () => {

  const [section, setSection] = useState<"create" | "load">("create")

  return (
    <div>
      <h1 className='text-4xl'>Channel Management</h1>
      <div className='flex mt-10'>
        <div className="flex flex-col flex-1 pr-5 border-r-2 ">
          <BigButton selected={section == 'create'} text={"Create Channel"} onClick={() => {
            setSection("create")
          }} />
          <BigButton selected={section == 'load'} mt={2} text={"Load Channel"} onClick={() => {
            setSection("load")
          }} />
        </div>
        <div className="flex-3 justify-center p-10 h-full">
          {
            (section == 'create') ?
              <CreateChannel />
              :
              <CreateChannel />
          }
        </div>
      </div>
    </div>
  )
}

export default ChannelManagementComponent