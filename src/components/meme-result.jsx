import { Download, RotateCcw, Share2, Twitter } from "lucide-react"
import { downloadFile,shareContent, shareOnTwitter } from "@/utils/fileUtils"

export default function MemeResult({ meme, onMakeAnother }) {
  
  const handleDownload = () => {
    downloadFile(meme.meme_url)
  }


 

  return (
    <div className="space-y-6">
       

      {/* Meme Display */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-fuchsia-200">
        <img 
          src={meme.meme_url || "/placeholder.svg"} 
          alt="Generated meme" 
          className="w-full h-auto" 
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center hover:cursor-pointer justify-center gap-3 bg-yellow-400 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-6 py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Download Meme
        </button>

        <button
          onClick={onMakeAnother}
          className="flex items-center hover:cursor-pointer justify-center gap-3 bg-white hover:bg-gray-50 text-fuchsia-600 font-semibold px-6 py-4 rounded-2xl border-2 border-fuchsia-200 hover:border-fuchsia-300 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          Make Another Meme
        </button>
      </div>

  
      <div className="text-center text-sm text-gray-500">
        <p>🎉 Another masterpiece created by Meme Aunty!</p>
      </div>
    </div>
  )
}
