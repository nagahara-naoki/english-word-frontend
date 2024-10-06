import { createSelector, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "quizList",
  initialState: {
    quizLists: {},
    isLoading: false,
    isQuizMode: false,
    missQuizList: <any>[],
  },
  reducers: {
    setInitialize: (state) => {
      return {
        quizLists: {},
        isLoading: false,
        isQuizMode: false,
        missQuizList: [],
      };
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setLoadingClear: (state) => {
      state.isLoading = false;
    },
    setQuizMode: (state) => {
      state.isQuizMode = true;
    },
    setQuizListAction: (state, action) => {
      state.quizLists = action.payload; // fetchしたデータをstateに保存
      // state.isLoading = false;
      state.isQuizMode = true;
    },
    setMissQuizAction: (state, action) => {
      const quiz: any = action.payload;
      state.missQuizList.push(quiz);
    },
  },
});

export const { setQuizListAction } = counterSlice.actions;
export const { setLoadingClear } = counterSlice.actions;
export const { setInitialize } = counterSlice.actions;
export const { setLoading } = counterSlice.actions;
export const { setQuizMode } = counterSlice.actions;
export const { setMissQuizAction } = counterSlice.actions;

export const selectIsLoading = (state: any) => state.data.isLoading;
export const selectIsQuizMode = (state: any) => state.data.isQuizMode;
export const selectMissQuizList = (state: any) => state.data.missQuizList;

export default counterSlice.reducer;
