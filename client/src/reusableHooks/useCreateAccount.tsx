import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { createUser } from '../api/auth';
import type { UserTypes } from '../types/User';
import { uploadImage } from '../api/file';

export const useCreateAccount = () => {

  const [loading, setLoading] = useState(0);

  const create = useCallback(async (fullName: string, userName: string, password: string, userType?: UserTypes, iFile?: any) => {
    if (!(fullName && userName && password && userType && iFile)) {
      toast.error("Please provide all the details!")
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
            img: f.url,
            userType: userType
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
