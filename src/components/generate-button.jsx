"use client"

import { Sparkles } from "lucide-react"

export default function GenerateButton({ onGenerate, disabled, isGenerating, creditsLeft }) {
  const isOutOfCredits = creditsLeft < 0

  return (
    <div className="text-center">
      <button
        onClick={onGenerate}
        disabled={disabled || isGenerating || isOutOfCredits}
        className={`
          px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg
          ${
            disabled || isGenerating || isOutOfCredits
              ? "bg-purple-300 text-purple-100 cursor-not-allowed"
              : "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-xl hover:shadow-fuchsia-200"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span>Cook the Meme</span>
          <span className="text-xl">🍳</span>
          <Sparkles className="w-5 h-5" />
        </div>
      </button>

      {disabled && !isGenerating && !isOutOfCredits && (
        <div className="mt-4 bg-yellow-100 border border-yellow-200 rounded-xl p-3">
          <p className="text-yellow-800 text-sm font-medium">Upload a photo first! 📸</p>
        </div>
      )}

      {isOutOfCredits && (
        <div className="mt-4 bg-red-100 border border-red-200 rounded-xl p-3">
          <p className="text-red-800 text-sm font-medium">Free Limit over for today! Come Back Tomorrow to enjoy your free memes</p>
        </div>
      )}

      {!disabled && !isGenerating && !isOutOfCredits && (
        <div className="mt-3 space-y-2">
          <p className="text-gray-600 text-sm"> Your meme will be ready in seconds</p>
          <p className="text-purple-600 text-xs font-medium">This will use 1 credit ({creditsLeft - 1} remaining)</p>
        </div>
      )}
    </div>
  )
}
