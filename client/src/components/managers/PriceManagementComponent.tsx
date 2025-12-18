import { useCallback, useEffect, useState } from 'react'
import { enableOrDisableUser } from '../../api/user'
import toast from 'react-hot-toast'
import { useCreatePatient } from '../../reusableHooks/useCreatePatient'
import type { Patient } from '../../interfaces/Patient'
import Typography from '../ui/single/Typography'
import Button from '../ui/single/Button'
import TextInput from '../ui/single/TextInput'
import { showHideModel } from '../../utils/modelFunc'
import { getallSpecialities, registerSpeciality, toggleSpecialityStatus, updateSpeciality } from '../../api/systemData'
import { getError } from '../../utils/apiFunc'
import type { Speciality } from '../../interfaces/Speciality'

const PriceManagementComponent = () => {

  const [modalTitle, setModalTitle] = useState("");
  const [act, setAct] = useState<"Add Spec" | "Update Spec">("Add Spec");

  const [name, setName] = useState("");
  const [upId, setUpID] = useState("");
  const [price, setPrice] = useState("");
  const [creating, setCreating] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [triggerS, setTriggerS] = useState(0);

  const [specilities, setSpecialities] = useState<Speciality[]>([])

  const getAllSpecialities_ = async () => {
    try {
      const dt = await getallSpecialities()
      setSpecialities(dt.data)
    } catch (error) {
      console.log(getError(error))
    }
  }

  useEffect(() => {
    getAllSpecialities_();
  }, [triggerS])

  const registerSpeciality_ = async () => {
    if (!name || !price) {
      toast.error("Provide all details")
      return;
    }
    setCreating(true);
    try {
      const dt = await registerSpeciality({
        name,
        price
      })
      toast.success(dt.message)
      setTriggerS(s => s + 1)
      setCreating(false);
    } catch (error) {
      toast.error(getError(error))
      setCreating(false);
    }
  }

  const updateSpeciality_ = async () => {
    if (!name || !price) {
      toast.error("Provide all details")
      return;
    }
    setCreating(true);
    try {
      const dt = await updateSpeciality({
        id: upId,
        name,
        price
      })
      toast.success(dt.message)
      setTriggerS(s => s + 1)
      setCreating(false);
    } catch (error) {
      toast.error(getError(error))
      setCreating(false);
    }
  }

  const toggleStatusSpeciality_ = async (id: string) => {
    setToggling(true);
    const d = await toggleSpecialityStatus(id)
    setTriggerS(s => s + 1)
    toast.success(d.message)
    setToggling(false);
  }

  const primaryButton = () => {
    if (act == 'Add Spec') {
      registerSpeciality_();
    } else if (act == 'Update Spec') {
      updateSpeciality_();
    }
  }

  return (
    <div>
      <h1 className='text-4xl'>Manage Pricing</h1>
      <div className='flex'>
        <dialog id="speciality_model" className="modal">
          <div className="modal-box w-max min-w-max">
            <h3 className="font-bold text-3xl">{
              act == 'Add Spec' ? "Register Speciality" :
                act == 'Update Spec' ? "Update Speciality" :
                  ""
            }</h3>
            <TextInput title={'Name'} mt={5} placeHolder={'Type name'} type={'text'} text={name} setText={setName} />
            <TextInput title={'Price (LKR)'} mt={2} placeHolder={'Price (LKR)'} type={'number'} text={price} setText={setPrice} />
            <form method="dialog" className="modal-action">
              <Button loading={creating} onClick={primaryButton} text={act.startsWith("Add") ? 'Save' : 'Update'} type='nutral' />
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </dialog>
        <div className='flex flex-1 flex-col mt-5'>
          <div className='flex'>
            <Typography type='h2'>Manage Speciality</Typography>
            <div className='ml-2'><Button text='Add' type='nutral' onClick={() => {
              setAct('Add Spec')
              showHideModel('speciality_model', true)
            }} /></div>
          </div>
          <div className='flex mt-5'>
            <div className='flex flex-1 border-gray-500 border p-2'>
              <Typography>Speciality</Typography>
            </div>
            <div className='flex flex-1 border-gray-500 border p-2'>
              <Typography>Channel Price</Typography>
            </div>
            <div className='flex flex-1 border-gray-500 border p-2'>
            </div>
          </div>
          {
            specilities.map(s =>
              <div className='flex'>
                <div className='flex flex-1 border-gray-500 border p-2 items-center'>
                  <Typography>{s.name}</Typography>
                </div>
                <div className='flex flex-1 border-gray-500 border p-2 items-center'>
                  <Typography>{s.price + " LKR"}</Typography>
                </div>
                <div className='flex flex-1 border-gray-500 border p-2'>
                  <Button text={'Edit'} type='nutral' onClick={() => {
                    setAct('Update Spec')
                    setName(s.name)
                    setUpID(s._id)
                    setPrice(s.price + "")
                    showHideModel('speciality_model', true)
                  }} />
                  <Button text={(s.isActive) ? 'Disable' : 'Enable'} type={s.isActive ? 'cancel' : undefined} loading={toggling} onClick={() => {
                    toggleStatusSpeciality_(s._id)
                  }} />
                </div>
              </div>
            )
          }
        </div>
        <div className='flex flex-1 flex-col'>

        </div>
      </div>
    </div>
  )
}

export default PriceManagementComponent