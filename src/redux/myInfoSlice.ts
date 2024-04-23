import { createSlice } from '@reduxjs/toolkit';

type UserType = {
  email: string;
  id: number | null;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

const initialState: UserType = {
  email: '',
  id: null,
  nickname: '',
  profileImageUrl: null,
  createdAt: '',
  updatedAt: '',
};

const myInfoSlice = createSlice({
  name: 'myInfo',
  initialState,
  reducers: {
    setMyInfo: (state: UserType, action) => {
      return { ...state, ...action.payload };
    },
    clearMyInfo: () => {
      return initialState;
    },
  },
});

export const { setMyInfo, clearMyInfo } = myInfoSlice.actions;
export const myInfo = (state: { myInfo: UserType }) => state.myInfo;
export default myInfoSlice.reducer;
