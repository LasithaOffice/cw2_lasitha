import { useEffect, useState } from 'react'
import TextInput from '../ui/single/TextInput'
import DropDown from '../ui/single/DropDown'
import { userTypes, type UserTypes } from '../../types/User'
import ImageUploader from '../ui/single/ImageUploader'
import Button from '../ui/single/Button'
import { useCreateAccount } from '../../reusableHooks/useCreateAccount'
import UserList from '../reusableLists/UserList'
import { type User } from '../../interfaces/User'

const UserManagementComponent = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [img, setImg] = useState("");
  const [ifile, setIFile] = useState<any>();
  const [userType, setUserType] = useState<UserTypes | undefined>();

  const { create, loading } = useCreateAccount();

  const [currentUser, setCurrentUser] = useState<string[]>([]);

  const [triggerUserList, setTriggerUserList] = useState(0);

  useEffect(() => {
    if (loading == 0) {
      setName("");
      setPassword("");
      setUserName("");
      setIFile(undefined);
      setUserType(undefined)
    }
  }, [loading])

  useEffect(() => {
    if (currentUser.length > 0) {
      setName(currentUser[0]);
      setImg(currentUser[2]);
      setUserType(currentUser[1] as UserTypes)
    } else {
      setName("");
      setPassword("");
      setUserName("");
      setIFile(undefined);
      setUserType(undefined)
    }
  }, [currentUser])

  return (
    <div>
      <h1 className='text-4xl'>Manage System Users</h1>
      <div className='flex'>
        <div className='flex flex-1 flex-col'>
          <TextInput title={'Full Name'} mt={5} placeHolder={'type the name'} type={'text'} text={name}
            setText={setName} />
          <TextInput title={'User name'} mt={2} placeHolder={'type the user name (email address)'} type={'text'} text={userName}
            setText={setUserName} />
          <TextInput title={'Password'} mt={2} placeHolder={'type the password'} type={'password'} text={password}
            setText={setPassword} />
          <DropDown selected={userType} items={userTypes} title={'User Type'} setSelected={setUserType} />
          <ImageUploader setFile={(p) => {
            setIFile(p)
          }} img={img} />
          {
            (currentUser.length > 0) ?
              <div>
                <Button type='cancel' text={'Disable Account'} mt={5} onClick={async () => {
                  const success = await create(name, userName, password, userType, ifile);
                  if (success) {
                    setTriggerUserList(d => d + 1)
                  }
                }} loading={loading == 1} />
                <Button text={'Cancel'} mt={5} onClick={() => {
                  setCurrentUser([])
                }} />
              </div>
              :
              <Button text={'Create Account'} mt={5} onClick={async () => {
                const success = await create(name, userName, password, userType, ifile);
                if (success) {
                  setTriggerUserList(d => d + 1)
                }
              }} loading={loading == 1} />
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