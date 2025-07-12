import { STATE_CONFIGS } from "@/constants/app";

export default function StepBasedAunty({ currentState, creditsLeft }) {
  const config = STATE_CONFIGS[currentState];
  
  // Determine which image to show based on current state
  const getAuntyImage = () => {
    if (creditsLeft <= 0) {
      return "/no-credits.png"; // Image for no credits left state
    } else if (currentState === "result") {
      return "/final-nobg.png"; // Special celebration image for result state
    }
    return "/main-aunty.png"; // Default image for upload and vibe states
  };

  return (
    <div className=" relative">
      <div className=" rounded-3xl p-1 ">
        {/* Main Aunty Avatar */}
        <div className="full flex items-center justify-center ">
          <img className="h-96" src={getAuntyImage()} alt="" />
        </div>

        {/* Aunty's Message */}
        <div className="text-center">
          <div className="bg-white px-4 py-2 flex flex-col gap-1 border-2 border-fuchsia-200 rounded-2xl ">
            <h3 className="text-2xl font-bold text-gray-900">{config.title}</h3>
            <p className="text-gray-600 text-lg leading-tight">
              {config.message}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-center space-x-2">
            {["upload", "vibe", "result"].map((state) => (
              <div
                key={state}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentState === state
                    ? "bg-fuchsia-500 scale-125"
                    : (currentState === "vibe" && state === "upload") ||
                      (currentState === "result" &&
                        (state === "upload" || state === "vibe"))
                    ? "bg-fuchsia-300"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
