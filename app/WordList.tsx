import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsQuizMode,
  setLoading,
  setQuizListAction,
} from "./Redux/quizListSlice";
import { gsap } from "gsap";
import { QUIZ_COUNT, QUIZ_LIST } from "./const";
import { mouesLeaveAnimate, mouseEnterAnimate } from "./animate";

export default function WordList() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [allSelected, setAllSelected] = useState(false);
  const [showNextButtons, setShowNextButtons] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const quizList = QUIZ_LIST;
  const quizCount = QUIZ_COUNT;

  const buttonRef = useRef<any>(null);
  const nextButtonsRef = useRef<any>(null);
  const buttonRef1 = useRef<any>([]);
  const buttonRef2 = useRef<any>([]);

  const isQuizMode = useSelector(selectIsQuizMode);

  const fetchData = async () => {
    dispatch(setLoading());
    const api =
      String(process.env.getApi) +
      "/word-quiz/" +
      selectedWord +
      "/" +
      selectedValue;
    const response = await fetch(api);
    const result = await response.json();
    if (result && Object.keys(result)?.length) {
      setTimeout(() => {
        dispatch(setQuizListAction(result));
        router.push("/quizMode");
      }, 3000);
    }
  };

  const handleSelectedWord = (type: string) => {
    setSelectedWord(type);
    setShowNextButtons(true);
  };

  const handleQuizCount = (e: number) => {
    setSelectedValue(e);
    setAllSelected(true);
  };

  const cardAnimation = () => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      nextButtonsRef.current.children,
      { opacity: 0, scaleX: 0, transformOrigin: "center" }, // 中央から開始
      { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.2 } // アニメーション
    );
  };

  useEffect(() => {
    cardAnimation();
  }, []);

  useEffect(() => {
    cardAnimation();
  }, [showNextButtons]);

  useEffect(() => {
    if (allSelected && buttonRef.current) {
      // ボタンの初期状態を設定
      gsap.set(buttonRef.current, { opacity: 0, y: 20 }); // 下から出現

      // アニメーションを実行
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "bounce.out", // バウンス効果
      });
    }
  }, [allSelected]); // allSelectedが変わったときに実行

  const handleMouseEnter = (btn: any, index: number) => {
    gsap.to(btn.current[index], mouseEnterAnimate);
  };

  const handleMouseLeave = (btn: any, index: number) => {
    gsap.to(btn.current[index], mouesLeaveAnimate);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-color_white">カテゴリーを選択してください</p>
          <div ref={nextButtonsRef}>
            {Object.keys(quizList).map((e, i) => (
              <button
                ref={(el) => {
                  buttonRef1.current[i] = el; // voidを返すように修正
                }}
                onMouseEnter={() => handleMouseEnter(buttonRef1, i)} // indexを渡す
                onMouseLeave={() => handleMouseLeave(buttonRef1, i)} // indexを渡す
                key={e}
                className={`m-2 rounded p-2 ${
                  selectedWord === e
                    ? "bg-color_green text-white" // 選択された場合はダークグリーン
                    : "bg-gray-300"
                } active:bg-gray-300 hover:bg-color_green hover:text-white hover:scale-105 `}
                onClick={() => handleSelectedWord(e)}
              >
                {quizList[e]}
              </button>
            ))}
          </div>
        </div>
        {showNextButtons && (
          <div>
            <div className="flex gap-2 items-end">
              <p className="text-color_white">問題数を選択してください</p>
            </div>
            <div ref={nextButtonsRef}>
              {quizCount.map((e, i) => (
                <button
                  ref={(el) => {
                    buttonRef2.current[i] = el; // voidを返すように修正
                  }}
                  onMouseEnter={() => handleMouseEnter(buttonRef2, i)} // indexを渡す
                  onMouseLeave={() => handleMouseLeave(buttonRef2, i)} // indexを渡す
                  key={e}
                  className={`m-2 rounded p-2 ${
                    selectedValue === e
                      ? "bg-color_green text-white" // 選択された場合はダークグリーン
                      : "bg-gray-300"
                  } active:bg-gray-300 hover:bg-color_green hover:text-white hover:scale-105`}
                  onClick={() => handleQuizCount(e)}
                >
                  {e}個
                </button>
              ))}
            </div>
          </div>
        )}
        {allSelected && (
          <div ref={buttonRef}>
            <button
              onClick={fetchData}
              className={`bg-color_green text-white m-2 mt-5 p-2 rounded-md shadow-lg transition-transform transform hover:scale-105 active:scale-95`}
            >
              問題を作成する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
