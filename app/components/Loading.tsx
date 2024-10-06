import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LoadingDots = () => {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]); // 各ドットの参照を保持

  useEffect(() => {
    // 各ドットのアニメーション設定
    const animateDots = () => {
      dotsRef.current.forEach((dot, index) => {
        if (dot) {
          gsap.fromTo(
            dot,
            { y: 0 },
            {
              y: -15, // 上に動く距離
              duration: 0.5,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.2, // ドットごとに遅延を設定
            }
          );
        }
      });
    };

    animateDots(); // アニメーション開始
  }, []);

  return (
    <div
      className="gap-7 flex flex-col-reverse items-center justify-center"
      style={{ height: "100vh" }}
    >
      <div className="flex justify-center items-center space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              dotsRef.current[index] = el; // 配列に参照を格納
            }}
            className="dot"
          />
        ))}
        <style jsx>{`
          .dot {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            display: inline-block;
          }
        `}</style>
      </div>
      <h1 className="text-white font-mono text-3xl">問題作成中</h1>
    </div>
  );
};

export default LoadingDots;
