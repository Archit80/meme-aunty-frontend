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
    
    const response = await fetch(`${this.baseUrl}/generate-meme/`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    
    return data;
  }

}

// Export singleton instance
export const memeService = new MemeService()
export default memeService
