"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMissQuizList } from "../Redux/quizListSlice";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function Page() {
  const missQuizListSelector: [] = useSelector(selectMissQuizList);
  const router = useRouter();
  const toHome = () => {
    router.push("/");
  };
  // const data: any = [
  //   {
  //     desc: "いつも",
  //     quizList: {
  //       "／容疑者": false,
  //       到着する: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "always1always1always1",
  //   },
  //   {
  //     desc: "aaaaいつも",
  //     quizList: {
  //       "…を疑う…ではないかと思う／容疑者": false,
  //       到着する到着す到着す: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "ys2",
  //   },
  //   {
  //     desc: "いssssも",
  //     quizList: {
  //       "…を疑う…ではないかと思う": false,
  //       到着する到着する到着する: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "alwaalways1ys3",
  //   },
  // ];

  return (
    <div className="h-screen flex flex-col items-center text-gray">
      <div className="bg-white rounded-2xl z-20 p-10 shadow-2xl backdrop-blur-3xl mt-10 w-1/2">
        <div className="flex justify-between">
          <button
            onClick={toHome}
            className="text-color_black ml-auto flex gap-1 "
          >
            ホーム
            <FaHome size={24} color="black" />
          </button>
        </div>
        <p className="text-color_red text-xl mb-2 font-bold">間違えた問題</p>

        {missQuizListSelector.map((e: any, index: number) => (
          <div
            key={index}
            className="flex gap-5 mb-3 bg-color_bgRed p-3 rounded-md w-full"
          >
            <div className="text-color_black font-bold w-1/2">{e.word}</div>
            <div className="text-color_green2 w-1/2 font-bold">
              {Object.keys(e.quizList)
                .filter((key) => e.quizList[key] === true)
                .map((key, i) => (
                  <div key={i}>答え：{key}</div> // trueのキーを表示
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
