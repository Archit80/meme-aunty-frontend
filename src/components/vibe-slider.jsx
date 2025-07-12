"use client";

import { useState, useEffect } from "react";
import { VIBES } from "@/constants/vibes";
import {
  getVibeConfig,
  getClosestVibe,
  // getVibePreview,
} from "@/utils/vibeUtils";

export default function VibeSlider({
  selectedVibe,
  onVibeChange,
  onGenerate,
  disabled,
  creditsLeft,
}) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const vibe = getVibeConfig(selectedVibe);
    setSliderValue(vibe.value);
  }, [selectedVibe]);

  const handleSliderChange = (e) => {
    const value = Number.parseInt(e.target.value);
    setSliderValue(value);

    const closestVibe = getClosestVibe(value);
    if (closestVibe.id !== selectedVibe) {
      onVibeChange(closestVibe.id);
    }
  };

  const currentVibe = getVibeConfig(selectedVibe);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-purple-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">
          Select Meme Vibe
        </h3>
        <p className="text-gray-600 text-center lg:text-left mb-8">
          Slide to choose Aunty's meme personality 👀
        </p>  

        {/* aunty selected */}
        <div className="h-full w-full flex justify-center ">
          <img src={currentVibe.auntyImage} alt="vibe_based_aunty_image" className="h-64 rounded-2xl"/>
        </div>


        {/* Slider */}
        <div className="relative mb-6">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full outline-none hover:cursor-pointer appearance-none"
               style={{
              background: 'linear-gradient(to right, #3b82f6, #eab308, #ef4444)',
            }}
          />

          {/* Snap Points */}
          <div className="flex justify-between mt-4">
            {VIBES.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => onVibeChange(vibe.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl w-28 transition-all duration-200 hover:scale-105 hover:cursor-pointer ${
                  selectedVibe === vibe.id
                    ? `${vibe.bgColor} ring-2 ring-purple-300 shadow-lg`
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl">{vibe.emoji}</span>
                <span
                  className={`text-sm font-medium ${
                    selectedVibe === vibe.id ? vibe.color : "text-gray-600"
                  }`}
                >
                  {vibe.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Selection Display */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${currentVibe.bgColor} border-2 border-purple-200`}
          >
            <span className="text-3xl">{currentVibe.emoji}</span>
            <div>
              <div className={`font-bold text-lg ${currentVibe.color}`}>
                {currentVibe.label}
              </div>
              <div className="text-sm text-gray-600">
                {currentVibe.description}
              </div>
            </div>
          </div>
        </div>
    
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={onGenerate}
          disabled={disabled}
          className={`
            px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg
            hover:cursor-pointer
            ${
              disabled
                ? "bg-purple-300 text-purple-100 cursor-not-allowed"
                : "bg-gradient-to-r from-fuchsia-400 to-purple-500 hover:from-fuchsia-600 hover:to-purple-400 text-white hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-200"
            }
          `}
        >
          <div className="flex items-center gap-2">
            <span>Cook the Meme</span>
            <span className="text-xl">🍳</span>
          </div>
        </button>

        {disabled && creditsLeft <= 0 && (
          <div className="mt-4 bg-red-100 border border-red-200 rounded-xl p-3">
            <p className="text-red-800 text-sm font-medium">
              Free Limit over for today! Come back tomorrow to enjoy Aunty's Memes
            </p>
          </div>
        )}

        {!disabled && (
          <div className="mt-3 space-y-2">
            {/* <p className="text-gray-600 text-sm">
              ✨ Your meme will be ready in seconds
            </p> */}
            <p className="text-purple-600 text-xs font-medium">
              This will use 1 credit ({creditsLeft - 1} remaining)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
