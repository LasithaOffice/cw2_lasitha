import { useCallback, useEffect, useState } from 'react';
import PatientList from '../reusableLists/PatientList';
import Button from '../ui/single/Button';
import type { Patient } from '../../interfaces/Patient';
import DateTimeInput from '../ui/single/DateTimeInput';
import type { User } from '../../interfaces/User';
import UserList from '../reusableLists/UserList';
import Typography from '../ui/single/Typography';
import moment from "moment";
import { createChannel, getLastChannelId } from '../../api/channel';
import toast from 'react-hot-toast';
import PatientBox from './PatientBox';
import DoctorBox from './DoctorBox';

const CreateChannel = () => {

  const [patient, setPatient] = useState<Patient>()
  const [doctor, setDoctor] = useState<User>()
  const [dateTime, setDateTime] = useState<string>("")
  const [channelId, setChannelId] = useState<string>("")

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getLastChannelId().then(d => {
      setChannelId(d.data)
    })
  }, [])

  useEffect(() => {
    if (patient) {
      const modal: any = document.getElementById('patient_model');
      modal.close()
    }
  }, [patient])

  useEffect(() => {
    if (doctor) {
      const modal: any = document.getElementById('doctor_model');
      modal.close()
    }
  }, [doctor])

  const createChannel_ = useCallback(() => {
    setCreating(true);
    createChannel({
      patientId: patient?._id + "",
      doctorId: doctor?._id + "",
      dateTime: dateTime,
      channelNo: channelId
    }).then(d => {
      setCreating(false);
      toast.success(d.message)
      setPatient(undefined);
      setDoctor(undefined);
      setDateTime("");
      getLastChannelId().then(d => {
        setChannelId(d.data)
      })
    }).catch(error => {
      setCreating(false);
      toast.error(error.response.data.message)
    })
  }, [patient, channelId, doctor, dateTime])

  return (
    <div className='flex justify-center'>
      <div className='w-9/12'>
        <div className='border-2 rounded-2xl border-white flex justify-center items-center p-2 flex-col'>
          <Typography type='h2'>{'Channel No : ' + ((channelId) ? "C" + channelId : "Fetching...")}</Typography>
        </div>
        {
          channelId &&
          <div className='border-2 rounded-2xl border-white flex justify-center items-center p-2 flex-col mt-5'>
            {
              patient &&
              <PatientBox patient={patient} />
            }
            <Button text={(patient) ? 'Change Patient' : 'Select Patient'} mt={patient ? 2 : 0} onClick={() => {
              const doc: any = document.getElementById('patient_model');
              doc.showModal()
            }} />
            <dialog id="patient_model" className="modal">
              <div className="modal-box w-max min-w-max">
                {/* <h3 className="font-bold text-lg">Patient</h3> */}
                <PatientList setPatient={setPatient} />
                <form method="dialog" className="modal-action">
                  <button className="btn">Close</button>
                </form>
              </div>
            </dialog>
          </div>
        }

        {
          patient &&
          <div className='border-2 rounded-2xl border-white flex justify-center items-center p-2 flex-col mt-5'>
            <DateTimeInput title={'Channel Date & Time'} type={'datetime-local'} text={dateTime} setText={setDateTime} />
          </div>
        }
        {
          patient && dateTime.length > 1 &&
          <div className='border-2 rounded-2xl border-white flex justify-center items-center p-2 flex-col mt-5'>
            {
              doctor &&
              <DoctorBox doctor={doctor} />
            }
            <Button text={(doctor) ? 'Change Doctor' : 'Select Doctor'} mt={doctor ? 2 : 0} onClick={() => {
              const doc: any = document.getElementById('doctor_model');
              doc.showModal()
            }} />
            <dialog id="doctor_model" className="modal">
              <div className="modal-box w-max min-w-max">
                {/* <h3 className="font-bold text-lg">Patient</h3> */}
                <UserList initUserType='doctor' setUser={setDoctor} />
                <form method="dialog" className="modal-action">
                  <button className="btn">Close</button>
                </form>
              </div>
            </dialog>
          </div>
        }
        {
          doctor &&
          <div className='w-9/12'>
            <Button onClick={createChannel_} loading={creating} text={'Create Channel'} type='nutral' mt={5} />
          </div>
        }
      </div>
    </div>
  )
}

export default CreateChannel