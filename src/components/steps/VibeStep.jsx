import VibeSlider from "@/components/vibe-slider"

export default function VibeStep({ 
  selectedFile, 
  selectedVibe, 
  onVibeChange, 
  onGenerate, 
  creditsLeft 
}) {
  return (
    <div className="space-y-4">
      <div className="text-center lg:text-left">
        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          Choose a vibe.{" "}
          <span className="text-fuchsia-600 font-semibold underline decoration-wavy decoration-fuchsia-300">
            Let the meme cook!
          </span>
        </p>
      </div>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="bg-white rounded-2xl p-4 border border-purple-200 shadow-sm mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">📸</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">Ready for meme magic!</p>
            </div>
            {/* <button
              onClick={onChangePhoto}
              className="ml-auto text-gray-400 hover:text-gray-600 text-sm underline"
            >
              Change photo
            </button> */}
          </div>
        </div>
      )}

      <VibeSlider
        selectedVibe={selectedVibe}
        onVibeChange={onVibeChange}
        onGenerate={onGenerate}
        disabled={creditsLeft <= 0}
        creditsLeft={creditsLeft}
      />
    </div>
  )
}
