import StatusBanner from "@/components/ui/StatusBanner"
import ErrorAlert from "@/components/ui/ErrorAlert"
import UploadStep from "@/components/steps/UploadStep"
import VibeStep from "@/components/steps/VibeStep"
import ResultStep from "@/components/steps/ResultStep"
import { STATES } from "@/constants/app"

export default function MainContent({
  currentState,
  selectedFile,
  selectedVibe,
  creditsLeft,
  error,
  generatedMeme,
  onFileSelect,
  onVibeChange,
  onGenerate,
  onMakeAnother,
  onBackToVibe,
  onChangePhoto,
  captureImage,
  webcamRef,
  disabled,
}) {
  return (
    <div className="order-1 lg:order-2">
      {/* Status Banner (includes credits warning and out-of-credits state) */}
      <StatusBanner creditsLeft={creditsLeft} />
      
      {/* Error Display */}
      <ErrorAlert 
        error={error} 
        currentState={currentState} 
        onBackToVibe={onBackToVibe} 
      />

      {/* Dynamic Content Based on State */}
      {currentState === STATES.UPLOAD && (
        <UploadStep 
          onFileSelect={onFileSelect} 
          selectedFile={selectedFile} 
          captureImage={captureImage}
          webcamRef={webcamRef}
          disabled = {disabled}
  creditsLeft = {creditsLeft}
        />
      )}

      {currentState === STATES.VIBE && (
        <VibeStep
          selectedFile={selectedFile}
          selectedVibe={selectedVibe}
          onVibeChange={onVibeChange}
          onGenerate={onGenerate}
          onChangePhoto={onChangePhoto}
          creditsLeft={creditsLeft}
        />
      )}

      {currentState === STATES.RESULT && generatedMeme && (
        <ResultStep
          generatedMeme={generatedMeme}
          onMakeAnother={onMakeAnother}
          onBackToVibe={onBackToVibe}
        />
      )}

      {currentState === STATES.NO_CREDITS && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🚫</div>
          <div className="text-xl text-gray-700 mb-4">
            You're out of credits!
          </div>
          
        </div>
      )}
    </div>
  )
}
