export default function StatusBanner({ creditsLeft }) {
  // No credits left
  if (creditsLeft <= 0) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-center mt-6 h-full">
    
        <div className="text-red-500 text-lg">
          You've used all your free memes for today.
          <br />
          Come Back Tomorrow to Enjoy Aunty's Free Memes
        </div>
     
      </div>
    )
  }

  // Low credits warning
  if (creditsLeft <= 3) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center mb-6">
        <div className="text-yellow-600 font-medium mb-2">⚠️ Running low on credits!</div>
        <div className="text-yellow-700 text-sm">Only {creditsLeft} memes left to generate</div>
      </div>
    )
  }

  // No banner needed for normal credit levels
  return null
}
