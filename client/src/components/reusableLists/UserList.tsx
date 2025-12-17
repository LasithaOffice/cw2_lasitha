import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import DropDown from '../ui/single/DropDown'
import { userTypes, type UserTypes } from '../../types/User'
import { getAllUsers } from '../../api/user'
import { type User } from '../../interfaces/User'

type Props = {
  reloadKey?: number,
  setUser?: (v: string[]) => void
}

const UserList = (p: Props) => {

  const [selectedType, setSelectedType] = useState<UserTypes | "All">("All");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getAllUsers_ = async () => {
    setLoading(true);
    const dt = await getAllUsers({
      userType: selectedType
    })
    setUsers(dt.list)
    setLoading(false);
  }

  useEffect(() => {
    getAllUsers_()
  }, [selectedType, p.reloadKey])

  return (
    <div>
      <Typography type='h2' mt={5}>User List</Typography>
      <div className='flex flex-row items-center  pt-5'>
        <div className='w-40'>
          <DropDown selected={selectedType} items={["All", ...userTypes]} title={'User Type'} setSelected={setSelectedType} />
        </div>
        <div>
          {
            loading &&
            <span className="loading loading-spinner ml-5"></span>
          }
        </div>
      </div>
      <Table setValue={p.setUser} mt={5} columns={["Name", "User Type", "Image"]} data={users.map(d => [d.name, d.userType, d.img])} />
    </div>
  )
}

export default UserList