import { useState, useCallback } from "react"
import { validateFile } from "@/utils/fileUtils"

/**
 * Custom hook for file upload functionality
 * @returns {Object} - file state and handlers
 */
export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileSelect = useCallback((file) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return false
    }

    setError(null)
    setSelectedFile(file)
    return true
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))

    if (imageFile) {
      handleFileSelect(imageFile)
    }
  }, [handleFileSelect])

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const removeFile = useCallback(() => {
    setSelectedFile(null)
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setSelectedFile(null)
    setError(null)
    setIsDragOver(false)
  }, [])

  return {
    selectedFile,
    error,
    isDragOver,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    removeFile,
    reset
  }
}
