import { APP_CONFIG } from "@/constants/app"

 
export function validateFile(file) {
  if (!file) {
    return "No file provided"
  }

  if (!APP_CONFIG.allowedFileTypes.includes(file.type)) {
    return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)"
  }

  if (file.size > APP_CONFIG.maxFileSize) {
    return "File size must be less than 10MB"
  }

  return null
}


//  Formats file size in MB
export function formatFileSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + " MB"
}

/**
 * Creates a download link for a file, handling cross-origin issues.
 * @param {string} url - File URL
 * @param {string} filename - Desired filename
 */
export async function downloadFile(url, filename = "meme-aunty-creation.jpg") {
  try {
    // Fetch the image data from the cross-origin URL
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok.");

    // Create a blob from the response
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;

    // Append to the document, click, and then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up by revoking the temporary URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback for if the fetch/download process fails
    window.open(url, "_blank");
  }
}

 

/**
 * Shares content using Web Share API if available
 * @param {Object} content - Content to share {title, text, url}
 * @returns {Promise<boolean>} - Success status
 */
export async function shareContent(content) {
  if (navigator.share) {
    try {
      await navigator.share(content)
      return true
    } catch (err) {
      console.error("Failed to share:", err)
      return false
    }
  }
  return false
}

/**
 * Opens Twitter sharing URL
 * @param {string} text - Text to share
 */
export function shareOnTwitter(text) {
  const encodedText = encodeURIComponent(`${text}\n\nMade with Meme Aunty 👵`)
  window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, "_blank")
}

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}
