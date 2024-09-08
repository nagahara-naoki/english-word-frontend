import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuizListAction } from "./Redux/quizListSlice";

export default function WordList() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [buttonValidate, setButtonValiDate] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const quizList: { [key: string]: string } = {
    junior: "中学英語",
    highschool1: "高校英語１",
    highschool2: "高校英語2",
    highschool3: "高校英語3",
    toeic1: "TOEIC1",
    toeic2: "TOEIC2",
    toeic3: "TOEIC3",
  };

  const quizCount = [10, 30, 50];
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const api =
      String(process.env.getApi) +
      "/word-quiz/" +
      selectedWord +
      "/" +
      selectedValue;
    const response = await fetch(api);
    const result = await response.json();

    if (result && Object.keys(result)?.length) {
      router.push("/quizMode");
      dispatch(setQuizListAction(result));
    }
  };

  useEffect(() => {
    handleValidate();
  }, [selectedWord, selectedValue]);

  const handleSelectedWord = (type: string) => {
    setSelectedWord(type);
  };

  const handleQuizCount = (e: number) => {
    setSelectedValue(e);
  };

  const handleValidate = () => {
    if (selectedWord !== "" && selectedValue !== 0 && selectedValue <= 50) {
      setButtonValiDate(false);
    } else {
      setButtonValiDate(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!isLoading && (
        <div className="flex flex-col gap-4">
          <div>
            <p>問題一覧</p>
            {Object.keys(quizList).map((e) => (
              <button
                key={e}
                className={`m-2 rounded p-1 transition-all ${
                  selectedWord === e ? "bg-blue-500 text-white" : "bg-gray-300"
                } active:bg-gray-300 hover:bg-blue-500 hover:opacity-80 hover:text-white`}
                onClick={() => handleSelectedWord(e)}
              >
                {quizList[e]}
              </button>
            ))}
          </div>
          <div>
            <div className="flex gap-2 items-end">
              <p>問題数</p>
              {/* <p className="text-gray-400 text-sm">
            10~50個の中で問題数を入力してください
          </p> */}
            </div>
            {quizCount.map((e) => (
              <button
                key={e}
                className={`m-2 rounded p-1 transition-all ${
                  selectedValue === e ? "bg-blue-500 text-white" : "bg-gray-300"
                } active:bg-gray-300 hover:bg-blue-500 hover:opacity-80 hover:text-white`}
                onClick={() => handleQuizCount(e)}
              >
                {e}個
              </button>
            ))}
          </div>
          <div>
            <button
              disabled={buttonValidate || isLoading}
              onClick={fetchData}
              className={`${
                buttonValidate || isLoading ? "bg-gray-300" : "bg-blue-500"
              }  text-white m-2 p-2 rounded-md`}
            >
              問題を作成する
            </button>
          </div>
        </div>
      )}
      {isLoading && <div>問題を作成中です...</div>}
    </div>
  );
}
