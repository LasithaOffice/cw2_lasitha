import { useCallback, useEffect, useState } from 'react'
import TextInput from '../ui/single/TextInput'
import DropDown from '../ui/single/DropDown'
import { userTypes, type UserTypes } from '../../types/User'
import ImageUploader from '../ui/single/ImageUploader'
import Button from '../ui/single/Button'
import UserList from '../reusableLists/UserList'
import { enableOrDisableUser } from '../../api/user'
import toast from 'react-hot-toast'
import { useCreateUser } from '../../reusableHooks/useCreateUser'
import type { User } from '../../interfaces/User'
import type { Speciality } from '../../interfaces/Speciality'
import { getallSpecialities } from '../../api/systemData'

const UserManagementComponent = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [img, setImg] = useState("");
  const [ifile, setIFile] = useState<any>();
  const [userType, setUserType] = useState<UserTypes>('admin');
  const [speciality, setSpeciality] = useState<string>();

  const [specialities, setSpecialties] = useState<Speciality[]>([]);

  const { create, loading } = useCreateUser();

  const [currentUser, setCurrentUser] = useState<User>();

  const [triggerUserList, setTriggerUserList] = useState(0);

  useEffect(() => {
    getallSpecialities().then(d => {
      setSpecialties(d.data.filter(d => d.isActive))
    })
  }, [])

  useEffect(() => {
    if (loading == 0) {
      setName("");
      setPassword("");
      setUserName("");
      setImg("");
      setIFile(undefined);
      setUserType('admin')
      setSpeciality(undefined)
    }
  }, [loading])

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setUserType(currentUser.userType)
      setImg(currentUser.img);
      setSpeciality(currentUser.speciality?.name)
    } else {
      setName("");
      setPassword("");
      setUserName("");
      setImg("");
      setIFile(undefined);
      setUserType('admin')
      setSpeciality(undefined)
    }
  }, [currentUser])

  const [disabling, setDisabling] = useState(false);

  const enableOrDisableUser_ = useCallback(async () => {
    try {
      setDisabling(true);
      const dt = await enableOrDisableUser(currentUser?._id + "")
      toast.success(dt.message)
      setTriggerUserList(d => d + 1)
      setDisabling(false);
    } catch (error: any) {
      toast.error(error.response.data.message)
      setDisabling(false);
    }
  }, [currentUser])

  const createUser = useCallback(async () => {
    const success = await create(name, userName, password, userType, specialities.find(s => s.name == speciality), ifile);
    if (success) {
      setTriggerUserList(d => d + 1)
    }
  }, [name, userName, password, userType, ifile, speciality, specialities])

  return (
    <div>
      <h1 className='text-4xl'>Manage System Users </h1>
      <div className='flex'>
        <div className='flex flex-1 flex-col'>
          <TextInput title={'Full Name'} mt={5} placeHolder={'type the name'} type={'text'} text={name}
            setText={setName} />
          <TextInput title={'User name'} mt={2} placeHolder={'type the user name (email address)'} type={'text'} text={userName}
            setText={setUserName} />
          <TextInput title={'Password'} mt={2} placeHolder={'type the password'} type={'password'} text={password}
            setText={setPassword} />
          <DropDown selected={userType} mt={2} items={userTypes} title={'User Type'} setSelected={setUserType} />
          {
            (userType == 'doctor') &&
            <DropDown selected={speciality} items={specialities.map(s => s.name)} title={'Speciality'} setSelected={setSpeciality} />
          }
          <ImageUploader setFile={(p) => {
            setIFile(p)
          }} img={img} />
          {
            (currentUser) ?
              <div className='flex'>
                <Button type={currentUser.isActive ? 'cancel' : undefined}
                  text={currentUser.isActive ? 'Disable Account' : 'Enable Account'}
                  mt={5} onClick={enableOrDisableUser_} loading={disabling} />
                <div className='w-2'></div>
                <Button type='nutral' text={'Cancel'} mt={5} onClick={() => { setCurrentUser(undefined) }} />
              </div>
              :
              <Button text={'Create Account'} mt={5} onClick={createUser} loading={loading == 1} />
          }
          <div className='h-20'></div>
        </div>
        <div className='flex flex-2 px-5 flex-col'>
          <UserList reloadKey={triggerUserList} setUser={setCurrentUser} />
        </div>
      </div>
    </div>
  )
}

export default UserManagementComponent