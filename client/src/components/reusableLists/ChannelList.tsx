import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import DropDown from '../ui/single/DropDown'
import { type User } from '../../interfaces/User'
import type { Channel } from '../../interfaces/Channel'
import { getAllChannels } from '../../api/channel'
import { allChannelStatus, allScanStatus, type ChannelStatus, type ScanStatus } from '../../types/Channel'
import type { Patient } from '../../interfaces/Patient'

type Props = {
  reloadKey?: number,
  // initUserType?: UserTypes,
  setChannel?: (v: Channel) => void
}

const ChannelList = (p: Props) => {

  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);

  //Filters
  const [date, setDate] = useState<string>();
  const [doctor, setDoctor] = useState<User>();
  const [patient, setPatient] = useState<Patient>();
  const [channelStatus, setChannelStatus] = useState<ChannelStatus>();
  const [scanStatus, setScanStatus] = useState<ScanStatus>();

  const geAllChannels_ = async () => {
    setLoading(true);
    const dt = await getAllChannels({
      date,
      doctorId: doctor?._id,
      patientId: patient?._id,
      scanStatus,
      channelStatus,
    })
    console.log("channel.list", dt.data)
    setChannels(dt.data)
    setLoading(false);
  }

  useEffect(() => {
    geAllChannels_()
  }, [date, doctor, patient, channelStatus, scanStatus, p.reloadKey])

  return (
    <div>
      <Typography type='h2' mt={5}>{'Channel List'}</Typography>
      <div className='flex flex-row items-center pt-4'>
        {
          <div className='pr-2 flex flex-1'>
            <DropDown selected={channelStatus} items={["All", ...allChannelStatus]} title={'Channel Status'} setSelected={setChannelStatus} />
          </div>
        }
        {
          <div className='pr-2 flex flex-1'>
            <DropDown selected={scanStatus} items={["All", ...allScanStatus]} title={'Scan Status'} setSelected={setScanStatus} />
          </div>
        }
        {/* {
          <div className='w-40'>
            <DropDown selected={channelStatus} items={["All", ...allChannelStatus]} title={'User Type'} setSelected={setChannelStatus} />
          </div>
        }
        {
          <div className='w-40'>
            <DropDown selected={channelStatus} items={["All", ...allChannelStatus]} title={'User Type'} setSelected={setChannelStatus} />
          </div>
        } */}
        <div>
          {
            loading &&
            <span className="loading loading-spinner ml-5"></span>
          }
        </div>
      </div>
      <Table setValue={p.setChannel} mt={5} columns={["Channel No", "Patient", "Doctor", "Channel Status", "Scan Status"]} data={channels.map(d => [d.channelNo, d.patient.name, d.doctor.name, d.channelStatus, d.scanStatus])} allData={channels} />
    </div>
  )
}

export default ChannelList