import type { Patient } from '../../interfaces/Patient'
import moment from 'moment'

const PatientBox = ({ patient }: { patient: Patient }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex'>
        <img
          src={patient.img}
          alt="preview"
          className="w-20 h-20 border-r-2 border-2 border-white object-cover mb-2"
        />
      </div>
      <div className='flex'><div className='flex flex-1'>Patient ID :</div><div className='flex flex-1'>{patient.patientId}</div></div>
      <div className='flex'> <div className='flex flex-1'>Patient Name :</div><div className='flex flex-1'>{patient.name}</div></div>
      <div className='flex'><div className='flex flex-1'>Patient Gender :</div><div className='flex flex-1'>{patient.gender}</div></div>
      <div className='flex'><div className='flex flex-1'>Patient Age :</div><div className='flex flex-1'>{moment().diff(moment(patient.bDay), "years") + " Yrs"}</div></div>
      <div className='flex'><div className='flex flex-1'>Patient Contact :</div><div className='flex flex-1'>{patient.tele}</div></div>
    </div>
  )
}

export default PatientBox