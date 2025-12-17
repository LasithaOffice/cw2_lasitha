import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../config/reduxStore'
import type { User } from '../../interfaces/User'

// Define a type for the slice state
export interface UserState {
  user?: User
}
// Define the initial state using that type
const initialState: UserState = {
  user: undefined
}

export const authSlice = createSlice({
  name: 'authSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = undefined
    }
  }
})

export const { setUser, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer