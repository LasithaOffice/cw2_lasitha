import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import DropDown from '../ui/single/DropDown'
import { userTypes, type UserTypes } from '../../types/User'
import { getAllUsers } from '../../api/user'
import { type User } from '../../interfaces/User'
import { capitalizeFirst } from '../../utils/stringFunc'

type Props = {
  reloadKey?: number,
  initUserType?: UserTypes,
  setUser?: (v: User) => void
}

const UserList = (p: Props) => {

  const [selectedType, setSelectedType] = useState<UserTypes | "All">("All");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers_ = async () => {
    setLoading(true);
    const dt = await getAllUsers({
      userType: (p.initUserType) ? p.initUserType : selectedType
    })
    console.log("dt.list", dt.data)
    setUsers(dt.data)
    setLoading(false);
  }

  useEffect(() => {
    getAllUsers_()
  }, [selectedType, p.reloadKey])

  return (
    <div>
      <Typography type='h2' mt={5}>{p.initUserType ? `${capitalizeFirst(p.initUserType)} list` : 'User List'}</Typography>
      <div className='flex flex-row items-center  pt-5'>
        {
          !p.initUserType &&
          <div className='w-40'>
            <DropDown selected={selectedType} items={["All", ...userTypes]} title={'User Type'} setSelected={setSelectedType} />
          </div>
        }
        <div>
          {
            loading &&
            <span className="loading loading-spinner ml-5"></span>
          }
        </div>
      </div>
      <Table setValue={p.setUser} mt={5} columns={["Name", (p.initUserType == 'doctor') ? "Speciality" : "User Type", "Image"]} data={users.map(d => [d.name, (p.initUserType == 'doctor' ? d.speciality.name : d.userType), d.img])} allData={users} />
    </div>
  )
}

export default UserList