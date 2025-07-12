import { STEPS } from "@/constants/app"

export default function ProgressBar({ currentStep }) {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-8">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-200">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-fuchsia-600 text-white shadow-lg"
                      : currentStep === step.id - 1
                        ? "bg-yellow-400 text-gray-900 animate-pulse"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.id ? "text-fuchsia-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                    currentStep > step.id ? "bg-fuchsia-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
