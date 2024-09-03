"use client";
import React, { useState } from "react";

export default function WordList(props: any) {
  const [wordList, setWordList] = useState();

  const fetchData = async () => {
    const api = String(process.env.getApi);
    const response = await fetch(api);
    const result = await response.json();
    console.log(result);

    setWordList(result);
  };

  const handleAnswer = (e: boolean) => {
    return e;
  };

  return (
    <div>
      <button onClick={fetchData}>問題を表示</button>
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
