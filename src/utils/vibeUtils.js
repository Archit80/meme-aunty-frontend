import { VIBES } from "@/constants/vibes"

/**
 * Gets vibe configuration by ID
 * @param {string} vibeId - The vibe identifier
 * @returns {Object} - Vibe configuration object
 */
export function getVibeConfig(vibeId) {
  return VIBES.find(vibe => vibe.id === vibeId) || VIBES[0]
}

/**
 * Gets closest vibe based on slider value
 * @param {number} value - Slider value (0-100)
 * @returns {Object} - Closest vibe configuration
 */
export function getClosestVibe(value) {
  let closestVibe = VIBES[0]
  let minDistance = Math.abs(value - VIBES[0].value)

  VIBES.forEach(vibe => {
    const distance = Math.abs(value - vibe.value)
    if (distance < minDistance) {
      minDistance = distance
      closestVibe = vibe
    }
  })

  return closestVibe
}

/**
 * Gets vibe emoji by ID
 * @param {string} vibeId - The vibe identifier
 * @returns {string} - Vibe emoji
 */
export function getVibeEmoji(vibeId) {
  const vibe = getVibeConfig(vibeId)
  return vibe.emoji
}

/**
 * Gets vibe gradient colors by ID
 * @param {string} vibeId - The vibe identifier
 * @returns {string} - Tailwind gradient classes
 */
export function getVibeGradient(vibeId) {
  const vibe = getVibeConfig(vibeId)
  return vibe.gradientColors
}

/**
 * Gets vibe preview text by ID
 * @param {string} vibeId - The vibe identifier
 * @returns {string} - Preview text
 */
export function getVibePreview(vibeId) {
  const vibe = getVibeConfig(vibeId)
  return vibe.preview
}
