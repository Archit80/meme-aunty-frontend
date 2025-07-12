import StepBasedAunty from "@/components/step-based-aunty"

export default function Sidebar({
  currentState,
  selectedVibe,
  selectedFile,
  creditsLeft
}) {
  return (
    <div className="order-2 lg:order-1">
      <StepBasedAunty
        currentState={currentState}
        selectedVibe={selectedVibe}
        selectedFile={selectedFile}
        creditsLeft={creditsLeft}
      />
    </div>
  )
}
