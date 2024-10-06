"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import WordList from "./WordList";
import { store } from "./Redux/store";
import LoadingDots from "./components/Loading";
import { selectIsLoading } from "./Redux/quizListSlice";

export default function Home() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <Provider store={store}>
      <p className="text-white">{isLoading}</p>

      <div className="h-screen">
        {!isLoading && (
          <div className="flex flex-col items-center gap-14 h-full justify-center">
            <Header></Header>
            <WordList></WordList>
          </div>
        )}
        {isLoading && <LoadingDots />}
      </div>
    </Provider>
  );
}
