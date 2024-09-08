import { configureStore } from "@reduxjs/toolkit";
import setQuizListAction from "./quizListSlice";

export const store = configureStore({
  reducer: {
    data: setQuizListAction,
  },
});
