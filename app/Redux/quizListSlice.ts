import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "quizList",
  initialState: {
    quizLists: {},
  },
  reducers: {
    setQuizListAction: (state, action) => {
      state.quizLists = action.payload; // fetchしたデータをstateに保存
    },
  },
  //自動で同じ名前のAction Creatorが作成される。
});

export const { setQuizListAction } = counterSlice.actions; //actionCreatorのこと

export default counterSlice.reducer;
