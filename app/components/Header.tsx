import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // タイトルのアニメーション
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split(""); // 文字を分割
      titleRef.current.innerHTML = ""; // 元のテキストをクリア

      // 文字をspanでラップしてDOMに挿入
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        titleRef.current?.appendChild(span);
      });

      // GSAPアニメーションの設定
      gsap.fromTo(
        titleRef.current?.children,
        { opacity: 0, y: 100, rotation: 30 }, // 初期状態（下からフェードイン + 回転）
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.05, // 文字ごとに少し遅れてアニメーション
          ease: "bounce.out", // バウンス効果
        }
      );
    }
  }, []);

  return (
    <div>
      <h1
        ref={titleRef}
        className="text-6xl font-bold text-white relative z-10"
      >
        English Word Quiz
      </h1>
    </div>
  );
}
