import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import type { UserTypes } from '../types/User';
import { uploadImage } from '../api/file';
import { createUser } from '../api/user';
import type { Speciality } from '../interfaces/Speciality';

export const useCreateUser = () => {

  const [loading, setLoading] = useState(0);

  const create = useCallback(async (fullName: string, userName: string, password: string,
    userType: UserTypes, speciality?: Speciality, iFile?: any) => {
    console.log("speee 1", speciality)
    if (!(fullName && userName && password && userType && iFile)) {
      toast.error("Please provide all the details!")
      console.log(fullName + " " + userName + " " + password + " " + userType + " " + iFile);
      return false;
    }
    else {
      try {
        setLoading(1);
        const f = await uploadImage({
          file: iFile
        })
        try {
          const s = await createUser({
            userName: userName,
            password: password,
            name: fullName,
            img: f.data,
            userType: userType,
            specialityId: speciality?._id
          });
          setLoading(0);
          toast.success(s.message)
          return true;
        } catch (error: any) {
          setLoading(2);
          console.log(error)
          toast.error(error.response.data.message)
          return false;
        }
      }
      catch (error: any) {
        setLoading(2);
        console.log(error)
        toast.error(error.response.data.message)
        return false;
      }
    }

  }, [])

  return {
    create,
    loading
  }
}
