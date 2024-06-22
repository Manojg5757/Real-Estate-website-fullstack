import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStart:(state)=>{
        state.loading = true
    },
    deleteSuccess:(state)=>{
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteFailure:(state,action)=>{
       state.loading = false
       state.error = action.payload
    },
    signoutStart:(state)=>{
      state.loading = true
  },
  signoutSuccess:(state)=>{
    state.currentUser = null
    state.loading = false
    state.error = null
  },
  signoutFailure:(state,action)=>{
     state.loading = false
     state.error = action.payload
  }
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signoutStart,
  signoutSuccess,
  signoutFailure
} = userSlice.actions;

export default userSlice.reducer;
