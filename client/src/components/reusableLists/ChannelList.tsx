import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import DropDown from '../ui/single/DropDown'
import { type User } from '../../interfaces/User'
import type { Channel } from '../../interfaces/Channel'
import { getAllChannels } from '../../api/channel'
import { type ChannelStatus, type ScanStatus } from '../../types/Channel'
import type { Patient } from '../../interfaces/Patient'
import { useAppSelector } from '../../config/reduxStore'
import { currentUser } from '../../redux/slices/authSlice'
import moment from 'moment'

type Props = {
  reloadKey?: number,
  setChannel?: (v: Channel) => void,
  patient?: Patient
}

const ChannelList = (p: Props) => {

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);

  const user = useAppSelector(currentUser);

  //Filters
  const [date] = useState<string>();
  const [doctor] = useState<User>();
  const [channelStatus, setChannelStatus] = useState<ChannelStatus>();
  const [scanStatus, setScanStatus] = useState<ScanStatus>();

  const geAllChannels_ = async () => {
    setLoading(true);
    const dt = await getAllChannels({
      date,
      doctorId: (user?.userType == 'doctor') ? user._id : doctor?._id,
      patientId: (p.patient) ? p.patient._id : undefined,
      scanStatus,
      channelStatus,
    })
    console.log("channel.list", dt.data)
    setChannels(dt.data)
    setLoading(false);
  }

  useEffect(() => {
    geAllChannels_()
  }, [date, doctor, channelStatus, scanStatus, p.reloadKey, p.patient])

  const [cStats, setCStats] = useState<ChannelStatus[] | string[]>([])
  const [sStats] = useState<ScanStatus[] | string[]>([])

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
      <Typography type='h2' mt={5}>{(p.patient) ? 'Channels of ' + p.patient.name : ''}</Typography>
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
      <Table setValue={p.setChannel} mt={5} columns={["Channel No", "Patient", "Doctor", "Channel Status", "Date & time", "Cost"]} data={channels.map(d => [d.channelNo, d.patient.name, d.doctor.name, d.channelStatus, moment(d.dateTime).format("YYYY-MM-DD -- hh:mm a"), (d.doctor.speciality.price + " LKR")])} allData={channels} />
      <Typography mt={5} type='h2'>{"Total : " + channels.reduce((tot, c) => tot + c.doctor.speciality.price, 0) + " LKR"}</Typography>
    </div>
  )
}

export default ChannelList