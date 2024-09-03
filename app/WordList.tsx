"use client";
import React, { useState } from "react";

export default function WordList(props: any) {
  const [wordList, setWordList] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedWord, setSelectedWord] = useState("");

  const fetchData = async () => {
    console.log(selectedValue, selectedWord);

    const api =
      String(process.env.getApi) +
      "/word-quiz" +
      "/" +
      selectedWord +
      "/" +
      selectedValue;

    const response = await fetch(api);
    const result = await response.json();
    setWordList(result);
    console.log(result);
  };

  const handleSelectedWord = (type: string) => {
    setSelectedWord(type);
  };

  // 値が変更されたときに呼ばれる関数
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAnswer = (e: boolean) => {
    return e;
  };

  const createQuestion = () => {};

  return (
    <div>
      <p>問題一覧</p>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("junior")}
      >
        中学英語
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("highschool1")}
      >
        高校英語１
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("highschool2")}
      >
        高校英語２
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("highschool3")}
      >
        高校英語３
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("toeic1")}
      >
        TOEIC1
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("toeic2")}
      >
        TOEIC2
      </button>
      <button
        className="m-2 active:bg-gray-300"
        onClick={() => handleSelectedWord("toeic3")}
      >
        TOEIC3
      </button>
      <div>
        <div className="m-2">
          <label htmlFor="dropdown">問題数: </label>
          <select id="dropdown" value={selectedValue} onChange={handleChange}>
            <option value="">選択してください</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>

        <p className="m-2">
          選択された値:{selectedWord} 問題数： {selectedValue}
        </p>
        <button
          onClick={fetchData}
          className="m-2 bg-slate-400 p-1 rounded-sm hover:opacity-80"
        >
          問題を作成する
        </button>
      </div>
      {wordList &&
        Object.keys(wordList).map((e, i) => (
          <div key={i} className="m-4">
            <p key={e} className="mb-1">
              問題 : {wordList[e]["word"]}
              <span className="ml-2"></span>
            </p>
            {Object.keys(wordList[e]["quizList"]).map((word, i) => (
              <button
                key={i}
                className="p-2 hover:bg-blue-500 rounded-sm"
                onClick={() => handleAnswer(wordList[e]["quizList"][word])}
              >
                {word}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
}
