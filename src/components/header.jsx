import { APP_CONFIG } from "@/constants/app"

export default function Header({ creditsLeft, userName, isLoadingUser }) {
  return (
    <header className="border-b border-purple-200 bg-white/90 backdrop-blur-xs sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <div>
             <img className="h-16" src="/logo-3.png" alt="MEME AUNTY LOGO" />
            </div>
          </div>

          {/* Credits Display */}
          <div className="flex items-center gap-3">
            {!isLoadingUser && userName && (
              <div className="text-sm text-gray-600 font-medium">
                👤 {userName}
              </div>
            )}
            
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                creditsLeft <= 5
                  ? creditsLeft <= 0
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              <span className="text-sm">{creditsLeft}/{APP_CONFIG.maxCredits} credits</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
