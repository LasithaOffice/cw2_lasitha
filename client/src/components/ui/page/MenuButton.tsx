import { useEffect } from 'react'
import type { SectionTypes } from '../../../types/UI'
import { useAppSelector, useAppDispatch } from '../../../config/reduxStore'
import { getSection, setSection } from '../../../redux/slices/uiSlice'
import Button from '../single/Button'
import { currentUser } from '../../../redux/slices/authSlice'

type Props = {
  title: SectionTypes
}

const MenuButton = (p: Props) => {

  const user = useAppSelector(currentUser);
  const section = useAppSelector(getSection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.userType == 'admin') {
      dispatch(setSection('Manage System Users'))
    } else if (user?.userType == 'frontDesk') {
      dispatch(setSection('Manage Patients'))
    } else if (user?.userType == 'accountant') {
      dispatch(setSection('Manage Payments'))
    } else if (user?.userType == 'doctor') {
      dispatch(setSection('Manage Channels'))
    }
  }, [user])

  return (
    <Button text={p.title} mt={5} highlighted={section == p.title} onClick={() => {
      dispatch(setSection(p.title))
    }} />
  )
}

export default MenuButton