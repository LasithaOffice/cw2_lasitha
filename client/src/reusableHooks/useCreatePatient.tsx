import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadImage } from '../api/file';
import { createPatient } from '../api/patient';

export const useCreatePatient = () => {

  const [loading, setLoading] = useState(0);

  const create = useCallback(async (name: string, gender: string, address: string, tele: string, bDay: string, iFile?: any) => {
    if (!(name && gender && address && tele && bDay && iFile)) {
      toast.error("Please provide all the patient details!")
      return false;
    }
    else {
      try {
        setLoading(1);
        const f = await uploadImage({
          file: iFile
        })
        const img = f.data;
        try {
          const s = await createPatient({
            name,
            gender,
            address,
            tele,
            bDay,
            img,
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
