"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const data = useSelector((state: any) => {
    return state.data.quizLists;
  });
  console.log(data);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const data: any = {
  //   10: {
  //     desc: "いつも",
  //     quizList: {
  //       "／容疑者": false,
  //       到着する: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "always1",
  //   },
  //   12: {
  //     desc: "aaaaいつも",
  //     quizList: {
  //       "…を疑う…ではないかと思う／容疑者": false,
  //       到着する到着す到着す: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "always2",
  //   },
  //   13: {
  //     desc: "いsつsssssも",
  //     quizList: {
  //       "…を疑う…ではないかと思う": false,
  //       到着する到着する到着する: true,
  //       反対の: false,
  //       天蓋: false,
  //     },
  //     word: "always3",
  //   },
  // };
  const router = useRouter();
  const questionKeys = Object.keys(data); // 問題オブジェクトのキーを取得
  if (!questionKeys?.length) {
    router.push("/");
  }
  const [isAnswer, setIsAnswer] = useState(false);
  const [currentKey, setCurrentKey] = useState(questionKeys[0]); // 最初の問題のキーを設定
  const [counter, setCounter] = useState(1);
  const [finishQuestion, setFinishQuestion] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState(0);

  const handleAnswer = (answer: boolean) => {
    // ここに正解か不正解かの判定ロジックを追加
    setIsAnswer(true);

    setTimeout(() => {
      const currentIndex = questionKeys.indexOf(currentKey); // 現在のキーのインデックスを取得
      if (currentIndex < questionKeys.length - 1) {
        setCurrentKey(questionKeys[currentIndex + 1]); // 次の問題に進む
        setIsAnswer(false);
      }
      const count = counter + 1;
      setCounter(count);

      if (currentKey === questionKeys[questionKeys.length - 1]) {
        setFinishQuestion(true);
      }
      if (answer) {
        setTotalAnswer(totalAnswer + 1);
      }
    }, 1000);
  };

  const returnHome = () => {
    router.push("/");
  };

  // const replayQuiz = () => {
  //   console.log(questionKeys[0]);

  //   setCurrentKey(questionKeys[0]);
  //   setIsAnswer(false);
  //   console.log("return");
  // };

  return (
    <div className="h-screen">
      <div className="h-full flex items-center justify-center">
        {!finishQuestion && data && (
          <div>
            <div>
              <div className="flex gap-2 items-end">
                <p>
                  問題 {counter}/{questionKeys.length}
                </p>
                <button
                  onClick={returnHome}
                  className="text-sm text-gray-500 hover:opacity-50"
                >
                  ホームへ
                </button>
              </div>
              <p className="text-center p-8 text-5xl font-bold">
                {data[currentKey]?.word}
              </p>
            </div>
            <div className=" grid grid-cols-2 grid-rows-2 gap-10">
              {data[currentKey]?.quizList &&
                Object.keys(data[currentKey]?.quizList).map((i) => (
                  <div className="w-full relative" key={i}>
                    {isAnswer ? (
                      data[currentKey]?.quizList[i] ? (
                        <p className="text-red-500 pt-1 text-5xl h-full font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          ⭕️
                        </p>
                      ) : (
                        <p className="text-5xl absolute h-full font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          ×
                        </p>
                      )
                    ) : null}
                    <button
                      className={`h-full rounded p-4 transition-all w-full
                  bg-blue-500 text-white min-w-80
                   hover:bg-blue-500 hover:opacity-80 hover:text-white ${
                     isAnswer ? "pointer-events-none bg-gray-400" : ""
                   }`}
                      onClick={() => handleAnswer(data[currentKey].quizList[i])}
                    >
                      {i}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        {finishQuestion && (
          <div className="flex items-center justify-center">
            <div className="">
              {totalAnswer} / {questionKeys.length}
              <p>終了しました</p>
              <div className="flex gap-5 mt-4">
                <button
                  className="p-2 rounded whitespace-nowrap transition-all w-full
                  bg-blue-500 text-white"
                  onClick={returnHome}
                >
                  ホームへ
                </button>
                {/* <button
                  onClick={replayQuiz}
                  className=" p-2 rounded whitespace-nowrap transition-all w-full
                  bg-blue-500 text-white"
                >
                  やり直す
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
