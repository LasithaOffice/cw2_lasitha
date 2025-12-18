import type { User } from '../../interfaces/User'

const DoctorBox = ({ doctor }: { doctor: User }) => {
  return (
    <div className='flex flex-col w-full'>
      <img
        src={doctor.img}
        alt="preview"
        className="w-20 h-20 border-r-2 border-2 border-white object-cover mb-2"
      />
      <div className='flex'><div className='flex flex-1'>Doctor Name :</div><div className='flex flex-1'>{doctor.name}</div></div>
      <div className='flex'> <div className='flex flex-1'>Speciality :</div><div className='flex flex-1'>{doctor.speciality.name}</div></div>
    </div>
  )
}

export default DoctorBox