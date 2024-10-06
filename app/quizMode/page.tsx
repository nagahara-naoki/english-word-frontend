"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import {
  setInitialize,
  setLoadingClear,
  setMissQuizAction,
  setQuizMode,
} from "../Redux/quizListSlice";
import { gsap } from "gsap";
import { quizButtonAnimate } from "../animate";

export default function Page() {
  const dispatch = useDispatch();
  dispatch(setQuizMode());
  dispatch(setLoadingClear());

  const data = useSelector((state: any) => {
    return state.data.quizLists;
  });

  const questionKeys = Object.keys(data); // 問題オブジェクトのキーを取得
  const [currentKey, setCurrentKey] = useState(questionKeys[0]); // 最初の問題のキーを設定
  const router = useRouter();
  const [isAnswer, setIsAnswer] = useState(false);
  const [counter, setCounter] = useState(1);
  const [finishQuestion, setFinishQuestion] = useState(false);
  const [totalAnswer, setTotalAnswer] = useState(0);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

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
  // if (!questionKeys?.length) {
  //   router.push("/");
  // }

  useEffect(() => {
    gsap.to(buttonRef.current, quizButtonAnimate);
  }, []);

  useEffect(() => {
    const card: any = cardRef.current;
    card.style.willChange = "transform, opacity";

    const tl = gsap.timeline({ paused: true });

    tl.to(card, {
      rotateX: -90,
      ease: "power2.inOut",
      duration: 0.4, // アニメーション時間を短縮して軽減
    })
      .to(
        card,
        {
          opacity: 0,
          duration: 0.25, // 不要な時間を削減して軽く
        },
        "<"
      ) // 重ねて実行して時間を短縮
      .fromTo(
        card,
        {
          y: 200,
          opacity: 0,
          rotateX: 90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          ease: "back.out(2.0)", // easeを少し軽くする
          duration: 0.4, // アニメーションの時間を少し短縮
        }
      );

    tl.play();

    return () => {
      tl.kill();
      card.style.willChange = ""; // クリーンアップでリセット
    };
  }, [counter]);
  const handleAnswer = (answer: boolean, quiz: any) => {
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
      } else {
        dispatch(setMissQuizAction(quiz));
      }
    }, 1000);
  };

  const returnHome = () => {
    router.push("/");
    dispatch(setInitialize());
  };

  const toMissPage = () => {
    router.push("/missQuizList");
  };

  return (
    <div className="h-screen">
      <div className="h-full flex items-center justify-center" ref={cardRef}>
        {!finishQuestion && data && (
          <div className="bg-color_white/50 rounded-2xl z-20 p-10 shadow-2xl backdrop-blur-3xl">
            <div className="text-color_white">
              <div className="flex gap-6 items-end">
                <p className="text-black font-bold">
                  問題 {counter}/{questionKeys.length}
                </p>
                <div
                  onClick={returnHome}
                  className="flex cursor-pointer items-end gap-2 text-sm text-black hover:opacity-50"
                >
                  <p>ホーム</p>
                  <FaHome size={24} color="black" />
                </div>
              </div>
              <p className="text-center p-8 text-5xl font-bold text-black">
                {data[currentKey]?.word}
              </p>
            </div>
            <div className=" grid grid-cols-2 grid-rows-2 gap-10">
              {data[currentKey]?.quizList &&
                Object.keys(data[currentKey]?.quizList).map((i) => (
                  <div className="w-full relative" key={i}>
                    {isAnswer ? (
                      data[currentKey]?.quizList[i] ? (
                        <p className="text-red-500 z-20 pt-1 text-5xl h-full font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          ⭕️
                        </p>
                      ) : (
                        <p className="text-5xl z-20 absolute h-full font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          ×
                        </p>
                      )
                    ) : null}
                    <button
                      className={`h-full rounded p-4 transition-all transform w-full
                text-white min-w-80 border border-white border-opacity-30
                hover:bg-white hover:opacity-80 hover:text-black 
                hover:scale-105 ${
                  // ホバー時にスケールを拡大
                  isAnswer ? "pointer-events-none" : ""
                }`}
                      onClick={() =>
                        handleAnswer(
                          data[currentKey].quizList[i],
                          data[currentKey]
                        )
                      }
                    >
                      {i}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        {finishQuestion && (
          <div className="flex items-center justify-center bg-color_white/50 rounded-2xl z-20 p-10 shadow-2xl backdrop-blur-3xl">
            <div className="min-w-96">
              <p className="text-center font-bold text-xl">お疲れ様でした</p>
              <div className="m-8 flex flex-col gap-3 ">
                <p className="text-lg">
                  問題数：
                  <span className="font-bold">{questionKeys.length}</span>
                </p>
                <p className="text-lg">
                  正解数: <span className="font-bold">{totalAnswer}</span>
                </p>
                <p className="text-lg">
                  正答率：
                  <span className="font-bold">
                    {((totalAnswer / questionKeys.length) * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
              <button
                className="bg-black text-white text-center p-2 rounded-sm transition-all hover:opacity-60"
                onClick={toMissPage}
              >
                間違えた問題を見る
              </button>
              <div className="flex gap-5 mt-8">
                <button
                  className="animate-bounce p-2 rounded whitespace-nowrap w-full
                  bg-color_green text-white"
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
