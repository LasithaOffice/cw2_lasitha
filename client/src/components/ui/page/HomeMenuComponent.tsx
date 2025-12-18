import { useAppSelector } from "../../../config/reduxStore";
import UserDataComponent from "./UserDataComponent"
import { currentUser } from "../../../redux/slices/authSlice";
import MenuButton from "./MenuButton";

const HomeMenuComponent = () => {

  const user = useAppSelector(currentUser);

  return (
    <div className="flex flex-col bg-base-200 h-dvh">
      <UserDataComponent />
      {
        user?.userType == 'admin' &&
        <div className="px-5 flex flex-col">
          <MenuButton title={"Manage System Users"} />
          <MenuButton title={"Manage Pricing"} />
        </div>
      }
      {
        user?.userType == 'frontDesk' &&
        <div className="px-5 flex flex-col">
          <MenuButton title={"Manage Patients"} />
          <MenuButton title={"Manage Channels"} />
        </div>
      }
      {
        user?.userType == 'accountant' &&
        <div className="px-5 flex flex-col">
          <MenuButton title={"Manage Payments"} />
        </div>
      }
      {
        user?.userType == 'doctor' &&
        <div className="px-5 flex flex-col">
          <MenuButton title={"Manage Channels"} />
        </div>
      }
    </div>
  )
}

export default HomeMenuComponent