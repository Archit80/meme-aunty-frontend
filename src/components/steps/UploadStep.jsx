import UploadBox from "@/components/upload-box";
import Webcam from "react-webcam";
import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function UploadStep({
  onFileSelect,
  selectedFile,
  captureImage,
  webcamRef,
  disabled,
  creditsLeft
}) {
  const [showWebcam, setShowWebcam] = useState(false);

  const handleShowWebcam = () => {
    setShowWebcam(true);
  };

  return (
    !disabled &&  (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xl md:text-2xl text-gray-700 mt-8">
          Upload a photo.{" "}
          <span className="text-fuchsia-600 font-semibold underline decoration-wavy decoration-fuchsia-300">
            Let's get started!
          </span>
        </p>
      </div>
      <UploadBox onFileSelect={onFileSelect} selectedFile={selectedFile} disabled={disabled} creditsLeft={creditsLeft} />

      <div className="text-center">
        <p className="text-lg text-gray-600 mb-4">Or Click One Now</p>

        {!showWebcam ? (
          // Initial button to show webcam
          <div className="text-center flex justify-center">
            <button
              onClick={handleShowWebcam}
              className="px-4 py-2 flex gap-2 items-center justify-center bg-fuchsia-600 text-white rounded-xl transition-all duration-200 hover:bg-fuchsia-700 hover:scale-105 hover:cursor-pointer"
            >
              Open Camera
              <Camera />
            </button>
          </div>
        ) : (
          // Fullscreen Camera Overlay
          <div className="fixed inset-0 z-50 bg-black flex flex-col">
            

            {/* Webcam Component - Fullscreen */}
            <div className="flex-1 relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/4 flex items-center justify-center gap-4"> 

            {/* Capture Button - Bottom Center */}
              <button
                onClick={captureImage}
                className="w-16 h-16 bg-transparent border-4 group border-white rounded-full flex items-center justify-center transition-all duration-200 hover:cursor-pointer hover:scale-102 shadow-2xl"
                >
                <div className="w-12 h-12 bg-white group-hover:scale-90 rounded-full transition-all duration-200"></div>
              </button>
         
            {/* Close Button */}
              <button
                onClick={() => setShowWebcam(false)}
                className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200 hover:cursor-pointer"
                >
                <X className="w-6 h-6" />
              </button>
        
        </div>
            
          </div>
        )}
      </div>
    </div>)
  );
}
