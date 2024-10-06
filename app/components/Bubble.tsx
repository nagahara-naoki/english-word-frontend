import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { selectIsQuizMode } from "../Redux/quizListSlice";

const Bubbles = () => {
  const bubbleContainerRef = useRef<HTMLDivElement | null>(null);
  const isQuizMode = useSelector(selectIsQuizMode);
  const bubbleLimit = 10; // 同時に表示するバブルの最大数
  const bubbles = useRef<HTMLDivElement[]>([]); // 現在のバブルを追跡

  const createBubble = () => {
    if (bubbles.current.length >= bubbleLimit) return; // バブルの数を制限

    const bubble = document.createElement("div");
    bubble.className = `bubble ${
      Math.random() > 0.5 ? "bubble-large" : "bubble-small"
    }`;
    bubble.style.background = isQuizMode
      ? "yellow"
      : "rgba(255, 255, 255, 0.5)";

    bubbleContainerRef.current?.appendChild(bubble);
    bubbles.current.push(bubble); // 現在のバブルリストに追加

    // アニメーション設定
    gsap.fromTo(
      bubble,
      {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
        opacity: 0,
        scale: 0.5,
      },
      {
        y: -1000,
        opacity: 1,
        scale: 1,
        duration: Math.random() * 5 + 5, // 5〜10秒かけて上昇
        ease: "power1.out",
        onComplete: () => {
          bubble.remove(); // 上に到達したら削除
          bubbles.current = bubbles.current.filter((b) => b !== bubble); // バブルをリストから削除
        },
      }
    );
  };

  useEffect(() => {
    const loop = () => {
      createBubble();
      requestAnimationFrame(loop); // アニメーションフレームごとにバブルを生成
    };

    loop(); // ループを開始

    return () => {
      bubbles.current.forEach((bubble) => bubble.remove()); // クリーンアップ
      bubbles.current = []; // バブルリストをクリア
    };
  }, [isQuizMode]);

  return <div ref={bubbleContainerRef} className="bubble-container" />;
};

export default Bubbles;
