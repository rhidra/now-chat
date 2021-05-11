import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  
  initialState: {
    // Is the main sidebar open for mobile ?
    isSidebarOpen: true,
  },

  reducers: {
    setSidebarOpen: (state, {payload}) => {
      state.isSidebarOpen = payload;
    },
  },
})

export const { setSidebarOpen } = themeSlice.actions

export default themeSlice.reducer