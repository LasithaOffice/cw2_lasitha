import { useEffect, useState } from 'react'
import Typography from '../ui/single/Typography'
import Table from '../ui/single/Table'
import { getAllPatients } from '../../api/patient'
import TextInput from '../ui/single/TextInput'
import type { Patient } from '../../interfaces/Patient'

type Props = {
  reloadKey?: number,
  setPatient?: (v: Patient) => void
}

const PatientList = (p: Props) => {

  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const getAllPatients_ = async () => {
    setLoading(true);
    const dt = await getAllPatients({
      searchQuery
    })
    console.log("dt.list", dt.data)
    setPatients(dt.data)
    setLoading(false);
  }

  useEffect(() => {
    getAllPatients_()
  }, [searchQuery, p.reloadKey])

  return (
    <div>
      <Typography type='h2' mt={5}>Patient List</Typography>
      <div className='flex flex-row items-center  pt-5'>
        <div className='w-60'>
          <TextInput title={''} placeHolder={'Search By Patient Name...'} type={'text'} text={searchQuery} setText={setSearchQuery} />
        </div>
        <div>
          {
            loading &&
            <span className="loading loading-spinner ml-5"></span>
          }
        </div>
      </div>
      <Table setValue={p.setPatient} mt={5} columns={["Patient Id", "Name", "Gender", "Address", "Phone", "DOB", "Image"]} data={patients.map(d => [d.patientId, d.name, d.gender, d.address, d.tele, d.bDay, d.img])} allData={patients} />
    </div>
  )
}

export default PatientList