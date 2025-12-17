import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SectionTypes } from '../../types/UI'
import type { RootState } from '../../config/reduxStore'

// Define a type for the slice state
export interface UIState {
  section?: SectionTypes
}
// Define the initial state using that type
const initialState: UIState = {
  section: undefined
}

export const uiSlice = createSlice({
  name: 'authSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<SectionTypes>) => {
      state.section = action.payload
    },
  }
})

export const { setSection } = uiSlice.actions

export const getSection = (state: RootState) => state.ui.section
// Other code such as selectors can use the imported `RootState` type
export default uiSlice.reducer