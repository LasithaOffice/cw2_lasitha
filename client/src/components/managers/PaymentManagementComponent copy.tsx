import { useEffect, useState } from "react"
import BigButton from "../ui/single/BigButton"
import ChannelList from "../reusableLists/ChannelList"
import type { Channel } from "../../interfaces/Channel"
import { showHideModel } from "../../utils/modelFunc"
import PatientBox from "../reusableForms/PatientBox"
import Typography from "../ui/single/Typography"
import moment from "moment"
import Button from "../ui/single/Button"
import { makeChannelPayment, makeScanPayment } from "../../api/payment"
import toast from "react-hot-toast"
import type { ScanRequest } from "../../interfaces/ScanRequest"
import ScanRequestList from "../reusableLists/ScanRequestList"

const PaymentManagementComponent = () => {

  const [section, setSection] = useState<"channel" | "scan">("channel")

  const [channel, setChannel] = useState<Channel>();
  const [scanRequest, setScanRequest] = useState<ScanRequest>();

  const [processing, setProcessing] = useState(false)

  const [cTrigger, setCTrigger] = useState(0);
  const [sTrigger, setSTrigger] = useState(0);

  useEffect(() => {
    if (channel) {
      showHideModel('channel_payment_form', true);
      console.log("channel", channel)
    }
  }, [channel])

  useEffect(() => {
    if (scanRequest) {
      showHideModel('scan_payment_form', true);
      console.log("scan", scanRequest)
    }
  }, [scanRequest])

  const makeChannelPayment_ = async () => {
    setProcessing(true);
    const dt = await makeChannelPayment(channel?._id + "")
    toast.success(dt.message);
    setProcessing(false);
    setCTrigger(s => s + 1)
    showHideModel('channel_payment_form', false);
  }

  const makeScanPayment_ = async () => {
    setProcessing(true);
    const dt = await makeScanPayment(scanRequest?._id + "")
    toast.success(dt.message);
    setProcessing(false);
    setSTrigger(s => s + 1)
    showHideModel('scan_payment_form', false);
  }

  return (
    <div>
      <h1 className='text-4xl'>Payment Management</h1>
      <div className='flex mt-10'>
        <div className="flex flex-col flex-1 pr-5 border-r-2 ">
          <BigButton selected={section == 'channel'} text={"Channel Payments"} onClick={() => {
            setSection("channel")
          }} />
          <BigButton selected={section == 'scan'} mt={2} text={"Scan Payments"} onClick={() => {
            setSection("scan")
          }} />
        </div>
        <div className="flex-3 justify-center px-10 h-full">
          {
            (section == 'channel') ?
              <ChannelList reloadKey={cTrigger} setChannel={setChannel} />
              :
              <ScanRequestList reloadKey={sTrigger} setScanRequest={setScanRequest} />
          }
        </div>
        <dialog id="channel_payment_form" className="modal">
          <div className="modal-box w-9/12 min-w-9/12">
            {
              channel ?
                <div className="w-9/12">
                  <div className="flex">
                    <h3 className="text-2xl mr-2">Channel Payment - </h3>
                    {
                      channel.channelStatus == 'Payment Pending' ?
                        <h3 className="font-bold text-2xl text-red-600">Payment Pending</h3>
                        :
                        <h3 className="font-bold text-2xl text-green-500">Paid</h3>
                    }
                  </div>
                  <div className="flex">
                    <div className="p-5 border mt-5 w-90 mr-5">
                      <PatientBox patient={channel.patient} />
                    </div>
                    <div className="p-5 border mt-5">
                      <Typography type="h3" color="green1">{channel.doctor.speciality.name + " Channel"}</Typography>
                      <Typography type="h3" mt={2} color="gray-light">{"Date : " + moment(channel.dateTime).format("YYYY-MM-DD")}</Typography>
                      <Typography type="h3" mt={2} color="gray-light">{"Time : " + moment(channel.dateTime).format("hh:mm a")}</Typography>
                      <Typography type="h2" mt={10} >{"Cost : " + channel.doctor.speciality.price + " LKR"}</Typography>
                      {
                        channel.channelStatus == 'Payment Pending' &&
                        <Button text="PAY" type="nutral" loading={processing} mt={2} onClick={makeChannelPayment_} />
                      }
                    </div>
                  </div>
                </div>
                :
                scanRequest ?
                  <div>
                    <h3 className="font-bold text-lg">Scan Payment</h3>

                  </div>
                  :
                  <></>
            }
            <form method="dialog" className="modal-action">
              <button className="btn" onClick={() => {
                setChannel(undefined)
                setScanRequest(undefined)
              }}>Close</button>
            </form>
          </div>
        </dialog>
        <dialog id="scan_payment_form" className="modal">
          <div className="modal-box w-9/12 min-w-9/12">
            {
              scanRequest ?
                <div className="w-9/12">
                  <div className="flex">
                    <h3 className="text-2xl mr-2">Scan Payment - </h3>
                    {
                      !scanRequest.isPaid ?
                        <h3 className="font-bold text-2xl text-red-600">Payment Pending</h3>
                        :
                        <h3 className="font-bold text-2xl text-green-500">Paid</h3>
                    }
                  </div>
                  <div className="flex">
                    <div className="p-5 border mt-5 mr-5">
                      <Typography type="h3" color="green1">{scanRequest.type.name + " - " + scanRequest.diseas.name}</Typography>
                      <Typography type="h3" color="green1">{"Requested By Dr. " + scanRequest.channel.doctor.name}</Typography>
                      <Typography type="h2" mt={10} >{"Cost : " + (scanRequest.type.price + scanRequest.diseas.price) + " LKR"}</Typography>
                      {
                        !scanRequest.isPaid &&
                        <Button text="PAY" type="nutral" loading={processing} mt={2} onClick={makeScanPayment_} />
                      }
                    </div>
                    <div className="p-5 border mt-5 w-90">
                      <PatientBox patient={scanRequest.channel.patient} />
                    </div>
                  </div>
                </div>
                :
                scanRequest ?
                  <div>
                    <h3 className="font-bold text-lg">Scan Payment</h3>

                  </div>
                  :
                  <></>
            }
            <form method="dialog" className="modal-action">
              <button className="btn" onClick={() => {
                setChannel(undefined)
                setScanRequest(undefined)
              }}>Close</button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default PaymentManagementComponent