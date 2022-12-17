import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isLoading: boolean;
  isLightTheme: boolean | null;
}

interface IUpdateAction {
  payload: boolean;
}

const initialState: IState = {
  isLoading: false,
  isLightTheme: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state: IState, action: IUpdateAction) {
      const isLoading = action.payload;
      state.isLoading = isLoading;
    },
    setLightTheme(state: IState, action: IUpdateAction) {
      const isLightTheme = action.payload;
      state.isLightTheme = isLightTheme;
    },
  },
});

const uiActions = uiSlice.actions;
const uiReducer = uiSlice.reducer;

export { uiActions, uiReducer };
export default uiSlice;
