import { useEffect, useState } from 'react';
import PatientList from '../reusableLists/PatientList';
import Button from '../ui/single/Button';
import type { Patient } from '../../interfaces/Patient';
import DateTimeInput from '../ui/single/DateTimeInput';
import type { User } from '../../interfaces/User';
import UserList from '../reusableLists/UserList';
import Typography from '../ui/single/Typography';
import moment from "moment";

const CreateChannel = () => {

  const [patient, setPatient] = useState<Patient>()
  const [doctor, setDoctor] = useState<User>()
  const [dateTime, setDateTime] = useState<string>("")

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

  return (
    <div className='flex justify-center'>
      <div className='w-9/12'>
        <div className='border-2 rounded-2xl border-white flex justify-center items-center p-5 flex-col'>
          <Typography type='h2'>{'Channel No: ' + 1000002}</Typography>
        </div>
        <div className='border-2 rounded-2xl border-white flex justify-center items-center p-5 flex-col mt-5'>
          {
            patient &&
            <div className='flex flex-col w-full'>
              <div className='flex'>
                <img
                  src={patient.img}
                  alt="preview"
                  className="w-20 h-20 border-r-2 border-2 border-white mt-5 object-cover mb-5"
                />
              </div>
              <div className='flex'><div className='flex flex-1'>Patient ID :</div><div className='flex flex-1'>{patient.patientId}</div></div>
              <div className='flex'> <div className='flex flex-1'>Patient Name :</div><div className='flex flex-1'>{patient.name}</div></div>
              <div className='flex'><div className='flex flex-1'>Patient Gender :</div><div className='flex flex-1'>{patient.gender}</div></div>
              <div className='flex'><div className='flex flex-1'>Patient Age :</div><div className='flex flex-1'>{moment().diff(moment(patient.bDay), "years") + " Yrs"}</div></div>
              <div className='flex'><div className='flex flex-1'>Patient Contact :</div><div className='flex flex-1'>{patient.tele}</div></div>
            </div>
          }
          <Button text={(patient) ? 'Change Patient' : 'Select Patient'} mt={patient ? 5 : 0} onClick={() => {
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
        {
          patient &&
          <div className='border-2 rounded-2xl border-white flex justify-center items-center p-5 flex-col mt-5'>
            <DateTimeInput title={'Channel Date & Time'} type={'datetime-local'} text={dateTime} setText={setDateTime} />
          </div>
        }
        {
          patient && dateTime.length > 1 &&
          <div className='border-2 rounded-2xl border-white flex justify-center items-center p-5 flex-col mt-5'>
            {
              doctor &&
              <div className='flex flex-col w-full'>
                <img
                  src={doctor.img}
                  alt="preview"
                  className="w-20 h-20 border-r-2 border-2 border-white mt-5 object-cover mb-5"
                />
                <div className='flex'><div className='flex flex-1'>Doctor Name :</div><div className='flex flex-1'>{doctor.name}</div></div>
                <div className='flex'> <div className='flex flex-1'>Speciality :</div><div className='flex flex-1'>{doctor.speciality}</div></div>
              </div>
            }
            <Button text={(doctor) ? 'Change Doctor' : 'Select Doctor'} mt={doctor ? 5 : 0} onClick={() => {
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
      </div>
    </div>
  )
}

export default CreateChannel