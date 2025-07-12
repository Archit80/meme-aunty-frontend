import { useState, useRef, useEffect } from "react";
import { STATES, APP_CONFIG } from "@/constants/app";
import { VIBES } from "@/constants/vibes";
import { getStepFromState } from "@/utils/stateUtils";
import { memeService } from "@/services/memeService";
import { validateFile } from "@/utils/fileUtils";
// import Webcam from "react-webcam";

export function useMemeGenerator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVibe, setSelectedVibe] = useState(VIBES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [error, setError] = useState(null);
  const [currentState, setCurrentState] = useState(STATES.UPLOAD);
  const [creditsLeft, setCreditsLeft] = useState(APP_CONFIG.maxCredits);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const webcamRef = useRef(null);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/whoami/`);
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
          setCreditsLeft(data.credits_left);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Keep default values on error
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Monitor credits and automatically switch to NO_CREDITS state
  useEffect(() => {
    if (!isLoadingUser && creditsLeft <= 0 && currentState !== STATES.RESULT) {
      setCurrentState(STATES.NO_CREDITS);
    }
  }, [creditsLeft, isLoadingUser, currentState]);

  const handleFileSelect = (file) => {
    if (!file) {
      setSelectedFile(null);
      setError(null);
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setGeneratedMeme(null);
    setError(null);
    setCurrentState(STATES.VIBE);
  };

  const handleVibeChange = (vibe) => {
    setSelectedVibe(vibe);
  };

  const handleGenerate = async () => {
    if (!selectedFile || creditsLeft <= 0) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Use the meme service for generation
      const result = await memeService.generateMeme(selectedFile, selectedVibe);
      console.log("recieved data:", result);
      setGeneratedMeme(result);
      setCreditsLeft((prev) => prev - 1);
      setCurrentState(STATES.RESULT);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMakeAnother = () => {
    setSelectedFile(null);
    setGeneratedMeme(null);
    setSelectedVibe(VIBES[0].id);
    setError(null);
    
    // Check if user has credits left before going to upload
    if (creditsLeft <= 0) {
      setCurrentState(STATES.NO_CREDITS);
    } else {
      setCurrentState(STATES.UPLOAD);
    }
  };

  const getCurrentStep = () => {
    return getStepFromState(currentState);
  };

  const captureImage = () => {
    console.log("captureImage called");
    console.log("webcamRef.current:", webcamRef.current);
    
    if (!webcamRef.current) {
      console.error("Webcam ref is null!");
      setError("Camera not ready. Please try again.");
      return;
    }

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Screenshot captured:", imageSrc ? "Success" : "Failed");
      
      if (imageSrc) {
        setCapturedImage(imageSrc);

        // Convert base64 to File object
        const base64Data = imageSrc.split(",")[1]; // Remove data:image/jpeg;base64, prefix
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "image/jpeg" });
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });

        console.log("File created:", file);
        
        // Use the existing handleFileSelect logic
        handleFileSelect(file);
      } else {
        console.error("Failed to capture screenshot");
        setError("Failed to capture image. Please try again.");
      }
    } catch (error) {
      console.error("Error in captureImage:", error);
      setError("Error capturing image: " + error.message);
    }
  };

  return {
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
    capturedImage,
    webcamRef,
    getCurrentStep,
    disabled: creditsLeft <= 0 ||  isGenerating
  };
}
