import { useAppSelector } from '../../../config/reduxStore'
import { currentUser } from '../../../redux/slices/authSlice';

const UserDataComponent = () => {

  const user = useAppSelector(currentUser);

  return (
    user &&
    <div className='flex m-5'>
      <img src={user.img} width={50} height={50} className='rounded-full mr-4 border-2' />
      <div className='flex flex-10 flex-col '>
        <p className='text-2xl'>{user.name}</p>
        <p className='text-sm text-gray-400'>{user.userType}</p>
      </div>
    </div>
  )
}

export default UserDataComponent