import { useCallback, useEffect, useState } from 'react'
import TextInput from '../ui/single/TextInput'
import DropDown from '../ui/single/DropDown'
import { userTypes, type UserTypes } from '../../types/User'
import ImageUploader from '../ui/single/ImageUploader'
import Button from '../ui/single/Button'
import UserList from '../reusableLists/UserList'
import { enableOrDisableUser } from '../../api/user'
import toast from 'react-hot-toast'
import { useCreatePatient } from '../../reusableHooks/useCreatePatient'
import { allGenders } from '../../types/Patient'
import DateTimeInput from '../ui/single/DateTimeInput'
import PatientList from '../reusableLists/PatientList'
import type { Patient } from '../../interfaces/Patient'

const PatientManagementComponent = () => {

  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [address, setAddress] = useState("");
  const [tele, setTele] = useState("");
  const [bDay, setBDay] = useState("");
  const [img, setImg] = useState("");
  const [ifile, setIFile] = useState<any>();

  const { create, loading } = useCreatePatient();

  const [currentPatient, setCurrentPatient] = useState<Patient>();

  const [triggerList, setTriggerList] = useState(0);

  useEffect(() => {
    if (loading == 0) {
      setName("");
      setAddress("");
      setTele("");
      setGender("Male");
      setBDay("");
      setIFile(undefined);
    }
  }, [loading])

  useEffect(() => {
    if (currentPatient) {
      setName(currentPatient.name);
      setGender(currentPatient.gender)
      setAddress(currentPatient.address)
      setTele(currentPatient.tele)
      setBDay(currentPatient.bDay)
      setImg(currentPatient.img);
    } else {
      setName("");
      setGender("Male")
      setAddress("")
      setTele("")
      setBDay("")
      setIFile(undefined);
    }
  }, [currentPatient])

  const [disabling, setDisabling] = useState(false);

  const enableOrDisableUser_ = useCallback(async () => {
    try {
      setDisabling(true);
      const dt = await enableOrDisableUser(currentPatient?._id + "")
      toast.success(dt.message)
      setTriggerList(d => d + 1)
      setDisabling(false);
    } catch (error: any) {
      toast.error(error.response.data.message)
      setDisabling(false);
    }
  }, [currentPatient])

  const createPatient = useCallback(async () => {
    const success = await create(name, gender, address, tele, bDay, ifile);
    if (success) {
      setTriggerList(d => d + 1)
    }
  }, [name, gender, address, tele, bDay, ifile])

  return (
    <div>
      <h1 className='text-4xl'>Manage Patients</h1>
      <div className='flex'>
        <div className='flex flex-1 flex-col'>
          <TextInput title={'Full Name'} mt={5} placeHolder={'type the name'} type={'text'} text={name}
            setText={setName} />
          <DropDown selected={gender} items={allGenders} title={'Select the Gender'} setSelected={setGender} />
          <TextInput title={'Address'} mt={5} placeHolder={'type the address'} type={'text'} text={address}
            setText={setAddress} />
          <TextInput title={'Telephone No.'} mt={5} placeHolder={'type the phone number'} type={'text'} text={tele}
            setText={setTele} />
          <DateTimeInput title={'Birth Day'} type={'date'} text={bDay} setText={setBDay} />
          <ImageUploader setFile={(p) => {
            setIFile(p)
          }} img={img} />
          {
            (currentPatient) ?
              <div className='flex'>
                <Button type={currentPatient.isActive ? 'cancel' : undefined}
                  text={currentPatient.isActive ? 'Disable Account' : 'Enable Account'}
                  mt={5} onClick={enableOrDisableUser_} loading={disabling} />
                <div className='w-2'></div>
                <Button type='nutral' text={'Cancel'} mt={5} onClick={() => { setCurrentPatient(undefined) }} />
              </div>
              :
              <Button text={'Create Patient'} mt={5} onClick={createPatient} loading={loading == 1} />
          }
          <div className='h-20'></div>
        </div>
        <div className='flex flex-2 px-5 flex-col'>
          <PatientList reloadKey={triggerList} setPatient={setCurrentPatient} />
        </div>
      </div>
    </div>
  )
}

export default PatientManagementComponent