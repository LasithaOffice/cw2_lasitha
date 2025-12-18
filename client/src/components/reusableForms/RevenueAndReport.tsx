import { useEffect, useState } from 'react';
import { getAllChannels } from '../../api/channel';
import RevenueBox from './RevenueBox';
import { getAllScans } from '../../api/scan';


const RevenueAndReport = () => {

  const [channelRevenue, setChannelRevenue] = useState({
    paidIncome: 0,
    paidCount: 0,
    unpaidIncome: 0,
    unpaidCount: 0,
  });

  const [scan, setScan] = useState({
    paidIncome: 0,
    paidCount: 0,
    unpaidIncome: 0,
    unpaidCount: 0,
  });

  const geAllChannels_ = async () => {
    const dt = await getAllChannels({

    })
    console.log("channel.list", dt.data)
    setChannelRevenue({
      paidIncome: dt.data.filter(d => d.channelStatus != 'Payment Pending').reduce((tot, c) => tot + (c.doctor.speciality.price), 0),
      unpaidIncome: dt.data.filter(d => d.channelStatus == 'Payment Pending').reduce((tot, c) => tot + (c.doctor.speciality.price), 0),
      paidCount: dt.data.filter(d => d.channelStatus != 'Payment Pending').length,
      unpaidCount: dt.data.filter(d => d.channelStatus == 'Payment Pending').length
    })
  }

  const geAllScans_ = async () => {
    const dt = await getAllScans({

    })
    console.log("channel.list", dt.data)
    setScan({
      paidIncome: dt.data.filter(d => d.isPaid).reduce((tot, c) => tot + (c.diseas.price + c.type.price), 0),
      unpaidIncome: dt.data.filter(d => !d.isPaid).reduce((tot, c) => tot + (c.diseas.price + c.type.price), 0),
      paidCount: dt.data.filter(d => d.isPaid).length,
      unpaidCount: dt.data.filter(d => !d.isPaid).length
    })
  }

  useEffect(() => {
    geAllChannels_();
    geAllScans_();
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <RevenueBox data={channelRevenue.paidIncome + " LKR"} title={'Paid Channel Revenue'} color={'bg-blue-700/50'} />
        <RevenueBox data={channelRevenue.unpaidIncome + " LKR"} title={'Unpaid Channel Revenue'} color={'bg-red-700/50'} />
      </div>
      <div className='flex'>
        <RevenueBox data={channelRevenue.paidCount + ""} title={'Paid Channel Count'} color={'bg-blue-300/50'} />
        <RevenueBox data={channelRevenue.unpaidCount + ""} title={'Unpaid Channel Count'} color={'bg-red-300/50'} />
      </div>
      <div className='flex'>
        <RevenueBox data={scan.paidIncome + " LKR"} title={'Paid Scan Revenue'} color={'bg-green-700/50'} />
        <RevenueBox data={scan.unpaidIncome + " LKR"} title={'Unpaid Scan Revenue'} color={'bg-yellow-700/50'} />
      </div>
      <div className='flex'>
        <RevenueBox data={scan.paidCount + ""} title={'Paid Scan Count'} color={'bg-green-300/50'} />
        <RevenueBox data={scan.unpaidCount + ""} title={'Unpaid Scan Count'} color={'bg-yellow-300/50'} />
      </div>
    </div>
  )
}

export default RevenueAndReport