import { useState } from "react"
import BigButton from "../ui/single/BigButton"
import ChannelList from "../reusableLists/ChannelList"

const PaymentManagementComponent = () => {

  const [section, setSection] = useState<"create" | "load">("create")

  return (
    <div>
      <h1 className='text-4xl'>Channel Management</h1>
      <div className='flex mt-10'>
        <div className="flex flex-col flex-1 pr-5 border-r-2 ">
          <BigButton selected={section == 'create'} text={"Channel Payments"} onClick={() => {
            setSection("create")
          }} />
          <BigButton selected={section == 'load'} mt={2} text={"Scan Payments"} onClick={() => {
            setSection("load")
          }} />
        </div>
        <div className="flex-3 justify-center px-10 h-full">
          {
            (section == 'create') ?
              <ChannelList noScanStatus />
              :
              <ChannelList />
          }
        </div>
      </div>
    </div>
  )
}

export default PaymentManagementComponent