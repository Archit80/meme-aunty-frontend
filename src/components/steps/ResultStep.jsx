import MemeResult from "@/components/meme-result"

export default function ResultStep({ generatedMeme, onMakeAnother, onBackToVibe }) {
  return (
    <div className="space-y-4">
      <div className="text-center ">
        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          Your meme is ready!{" "}
          <span className="text-fuchsia-600 font-semibold underline decoration-wavy decoration-fuchsia-300">
            Share the magic! ✨
          </span>
        </p>
      </div>
      <MemeResult 
        meme={generatedMeme} 
        onMakeAnother={onMakeAnother} 
        onBackToVibe={onBackToVibe} 
      />
    </div>
  )
}
