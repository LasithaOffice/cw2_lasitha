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

type Props = {
  reloadKey?: number,
  setScanRequest?: (v: ScanRequest) => void
}

const ScanRequestList = (p: Props) => {

  const [loading, setLoading] = useState(false);
  const [sr, setSR] = useState<ScanRequest[]>([]);

  const user = useAppSelector(currentUser);

  //Filters
  const [date, setDate] = useState<string>();
  const [doctor, setDoctor] = useState<User>();
  const [patient, setPatient] = useState<Patient>();
  const [channelStatus, setChannelStatus] = useState<ChannelStatus>();
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
  }, [date, doctor, patient, channelStatus, scanStatus, p.reloadKey])

  const [cStats, setCStats] = useState<ChannelStatus[] | string[]>([])
  const [sStats, setSStats] = useState<ScanStatus[] | string[]>([])

  useEffect(() => {
    if (user?.userType == 'accountant') {
      setCStats(['Payment Pending', 'Paid'])
    } else if (user?.userType == 'doctor') {
      setCStats(['Paid', 'Completed'])
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
      <Table setValue={p.setScanRequest} mt={5} columns={["Scan", "Channel NO", "Patient", "Requested By", "Status"]} data={sr.map(d => [d.type.name + " - " + d.diseas.name, d.channel.channelNo, d.channel.patient.name, d.channel.doctor.name, (d.isPaid) ? 'Paid' : 'Payment pending'])} allData={sr} />
    </div>
  )
}

export default ScanRequestList