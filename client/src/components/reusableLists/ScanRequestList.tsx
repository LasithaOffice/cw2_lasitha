import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import DropDown from '../ui/single/DropDown'
import { type User } from '../../interfaces/User'
import { type ChannelStatus, type ScanStatus } from '../../types/Channel'
import type { Patient } from '../../interfaces/Patient'
import { useAppSelector } from '../../config/reduxStore'
import { currentUser } from '../../redux/slices/authSlice'
import { getAllScans } from '../../api/scan'
import type { ScanRequest } from '../../interfaces/ScanRequest'
import ScanViewer from '../reusableForms/ScanViewer'

type Props = {
  reloadKey?: number,
  setScanRequest?: (v: ScanRequest) => void
}

const ScanRequestList = (p: Props) => {

  const [loading, setLoading] = useState(false);
  const [sr, setSR] = useState<ScanRequest[]>([]);

  const user = useAppSelector(currentUser);
  const [scanR, setScanR] = useState<ScanRequest>();
  const [trigger, setTrigger] = useState(0);

  //Filters
  const [date] = useState<string>();
  const [doctor] = useState<User>();
  const [patient] = useState<Patient>();
  const [channelStatus, setChannelStatus] = useState<ChannelStatus>(user?.userType == 'radiologist' ? 'Paid' : 'Payment Pending');
  const [scanStatus, setScanStatus] = useState<ScanStatus>();

  const getAllScanRequests_ = async () => {
    setLoading(true);
    const dt = await getAllScans({
      isPaid: (channelStatus == 'Paid')
    })
    console.log("channel.list", dt.data)
    setSR(dt.data)
    setLoading(false);
  }

  useEffect(() => {
    getAllScanRequests_()
  }, [date, doctor, patient, channelStatus, scanStatus, p.reloadKey, trigger])

  const [cStats, setCStats] = useState<ChannelStatus[] | string[]>([])
  const [sStats] = useState<ScanStatus[] | string[]>([])

  useEffect(() => {
    if (user?.userType == 'accountant') {
      setCStats(['Payment Pending', 'Paid'])
    } else if (user?.userType == 'doctor') {
      setCStats(['Paid', 'Completed'])
    } else if (user?.userType == 'radiologist') {
      setCStats([])
    } else {
      setCStats(['Payment Pending', 'Paid', 'All'])
    }
  }, [user])

  return (
    <div>
      <Typography type='h2' mt={5}>{'Scan Request List'}</Typography>
      <div className='flex flex-row items-center pt-4'>
        {
          (cStats.length > 0) &&
          <div className='pr-2 flex flex-1'>
            <DropDown selected={channelStatus} items={cStats} title={'Channel Status'} setSelected={setChannelStatus} />
          </div>
        }
        {
          (sStats.length > 0) &&
          <div className='pr-2 flex flex-1'>
            <DropDown selected={scanStatus} items={sStats} title={'Scan Status'} setSelected={setScanStatus} />
          </div>
        }
        <div>
          {
            loading &&
            <span className="loading loading-spinner ml-5"></span>
          }
        </div>
      </div>
      <Table setValue={p.setScanRequest ? p.setScanRequest : setScanR} mt={5} columns={["Scan", "Channel NO", "Patient", "Requested By", "Status"]} data={sr.map(d => [d.type.name + " - " + d.diseas.name, d.channel.channelNo, d.channel.patient.name, d.channel.doctor.name, ((d.isCompleted) ? 'Complete' : 'In complete') + " - " + ((d.isPaid) ? 'Paid' : 'Payment pending')])} allData={sr} />
      <Typography mt={5} type='h2'>{"Total : " + sr.reduce((tot, c) => tot + (c.type.price + c.diseas.price), 0) + " LKR"}</Typography>
      <ScanViewer setScanReq={setScanR} scanReq={scanR} setCTrigger={setTrigger} />
    </div>
  )
}

export default ScanRequestList