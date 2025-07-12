class MemeService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL
  }

  /**
   * Generate a meme from image and vibe
   * @param {File} file - Image file
   * @param {string} vibe - Selected vibe
   * @param {string} deviceToken - Device token for identification
   * @returns {Promise<Object>} - Generated meme data
   */

  async generateMeme(file, vibe, deviceToken) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('vibe', vibe)
    formData.append('device_token', deviceToken)
    console.log("Sending data to server:", {
      file: file.name,
      vibe: vibe,
      device_token: deviceToken
    });
    try {
      const response = await fetch(`${this.baseUrl}/generate-meme/`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log("Meme generation response:", data);
      // Check if the response was successful (200)
      // if (!response.ok) {
      //   let errorData;
      //   try {
      //     errorData = await response;
      //   } catch (e) {
      //     throw new Error(e || response.statusText || 'An unknown server error occurred');
      //   }
      //   throw new Error(errorData.detail || 'Failed to generate meme');
      // }

      // successful response
      return await data;

    } catch (error) {
      console.error("Meme generation failed:", error);
      throw error;
    }
  }

}

// Export singleton instance
export const memeService = new MemeService()
export default memeService
