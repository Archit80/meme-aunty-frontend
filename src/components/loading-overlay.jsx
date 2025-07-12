import { useState, useEffect } from "react";
import { LOADING_MESSAGES } from "@/constants/app";
import { VIBE_COLORS, VIBE_EMOJIS } from "@/constants/vibes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingOverlay({ vibe }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-white " />

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-6xl px-4">
        <DotLottieReact
          src="https://lottie.host/d9804082-d73b-4387-9ffd-2fec9494e07b/MvRy3LYlrC.json"
          loop
          autoplay
        />

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${VIBE_COLORS[vibe]} animate-pulse`}
                style={{
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white rounded-full h-3 shadow-inner mb-6">
            <div
              className={`h-3 bg-gradient-to-r ${VIBE_COLORS[vibe]} rounded-full transition-all duration-1000 ease-out animate-pulse`}
              style={{ width: "69%" }}
            />
          </div>
        </div>
        {/* Loading Messages */}
        <div className="space-y-4">
          <h2 className="text-2xl w-full md:text-3xl font-bold text-gray-900">
            {LOADING_MESSAGES[currentMessage]}
            {dots}
          </h2>
        </div>
      </div>
    </div>
  );
}
