export default function ErrorAlert({ error, currentState, onBackToVibe }) {
  if (!error) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center mb-6">
      <div className="text-red-600 font-medium mb-2">Oops! Something went wrong</div>
      <div className="text-red-500 text-sm mb-3">{error}</div>
      {currentState === "result" && (
        <button
          onClick={onBackToVibe}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
