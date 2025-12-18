import React, { useEffect, useState } from 'react'
import { getallDisease, getallScanType } from '../api/systemData'
import type { Disease } from '../interfaces/Disease'
import type { ScanType } from '../interfaces/ScanType'
import { getError } from '../utils/apiFunc'

const useScansAndDiseases = () => {

  const [scanTypes, setScanTypes] = useState<ScanType[]>([])
  const [diseases, setDiseases] = useState<Disease[]>([])

  const getAllScanTypes_ = async () => {
    try {
      const dt = await getallScanType()
      setScanTypes(dt.data.filter(d => d.isActive))
    } catch (error) {
      console.log(getError(error))
    }
  }

  const getAllDiseases_ = async () => {
    try {
      const dt = await getallDisease()
      setDiseases(dt.data.filter(d => d.isActive))
    } catch (error) {
      console.log(getError(error))
    }
  }

  useEffect(() => {
    getAllScanTypes_();
    getAllDiseases_();
  }, [])

  return {
    scanTypes,
    diseases
  }
}

export default useScansAndDiseases