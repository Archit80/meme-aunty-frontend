import Header from "@/components/header";
// import ProgressBar from "@/comp   onents/progress-bar";
import ErrorBoundary from "@/components/error-boundary";
import LoadingOverlay from "@/components/loading-overlay";
import PageHeader from "@/components/layout/PageHeader";
import MainContent from "@/components/layout/MainContent";
import Sidebar from "@/components/layout/Sidebar";
import { useMemeGenerator } from "@/hooks/useMemeGenerator";

export default function App() {
  const {
    selectedFile,
    selectedVibe,
    isGenerating,
    generatedMeme,
    error,
    currentState,
    creditsLeft,
    userName,
    isLoadingUser,
    handleFileSelect,
    handleVibeChange,
    handleGenerate,
    handleMakeAnother,
    captureImage,
    webcamRef,
    disabled
  } = useMemeGenerator();

  const getPageTitle = () => {
    switch (currentState) {
      case "upload":
        return "Say Hello to Meme Aunty!";
      case "vibe":
        return "Choose the Perfect Vibe";
      case "result":
        return "Your Masterpiece is Ready!";
      default:
        return "Meme Aunty";
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-fuchsia-50 relative font-sans">
        <Header 
          creditsLeft={creditsLeft} 
          userName={userName}
          isLoadingUser={isLoadingUser}
        />
        {isGenerating && <LoadingOverlay vibe={selectedVibe} />}
        {/* <ProgressBar currentStep={getCurrentStep()} /> */}

        <PageHeader title={getPageTitle()} />

        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Sidebar
              currentState={currentState}
              selectedVibe={selectedVibe}
              selectedFile={selectedFile}
              creditsLeft={creditsLeft}
            />

            <MainContent
              currentState={currentState}
              selectedFile={selectedFile}
              selectedVibe={selectedVibe}
              creditsLeft={creditsLeft}
              error={error}
              generatedMeme={generatedMeme}
              onFileSelect={handleFileSelect}
              onVibeChange={handleVibeChange}
              onGenerate={handleGenerate}
              onMakeAnother={handleMakeAnother}
              captureImage={captureImage}
              webcamRef={webcamRef}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
