"use client";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WordList from "./WordList";
import { store } from "./Redux/store";

export default async function Home() {
  return (
    <Provider store={store}>
      <div className="h-screen">
        <div className="m-40 flex flex-col items-center gap-14 h-full">
          <Header></Header>
          <WordList></WordList>
          {/* <Footer></Footer> */}
        </div>
      </div>
    </Provider>
  );
}
