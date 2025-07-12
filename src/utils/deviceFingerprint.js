/**
 * Generate a basic device fingerprint using non-invasive browser properties
 * This helps prevent easy abuse while respecting user privacy
 */

function generateBasicFingerprint() {
  const components = [
    // Screen resolution (most stable identifier)
    `screen:${screen.width}x${screen.height}x${screen.colorDepth}`,
    
    // Timezone (reasonably stable)
    `tz:${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
    
    // User agent (browser + OS info)
    `ua:${navigator.userAgent}`,
    
    // Language preference
    `lang:${navigator.language}`,
    
    // Platform info
    `platform:${navigator.platform}`,
  ];

  // Create a hash of all components
  const fingerprintString = components.join('|');
  
  // Simple hash function (not cryptographic, just for fingerprinting)
  let hash = 0;
  for (let i = 0; i < fingerprintString.length; i++) {
    const char = fingerprintString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36); // Convert to base36 string
}

function getDeviceToken() {
  // Generate fingerprint
  const fingerprint = generateBasicFingerprint();
  
  // Get or create localStorage token
  const STORAGE_KEY = 'meme_device_token';
  let storedToken = localStorage.getItem(STORAGE_KEY);
  
  if (!storedToken) {
    storedToken = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, storedToken);
  }
  
  // Combine fingerprint + stored token for stronger identification
  // This way, even if someone clears localStorage, the fingerprint helps identify them
  const combinedIdentifier = `${fingerprint}-${storedToken.slice(0, 8)}`;
  
  return combinedIdentifier;
}

export { getDeviceToken, generateBasicFingerprint };
