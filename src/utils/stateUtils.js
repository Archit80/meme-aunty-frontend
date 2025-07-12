import { STATES, STEPS } from "@/constants/app"

/**
 * Maps current state to step number
 * @param {string} currentState - Current app state
 * @returns {number} - Step number
 */
export function getStepFromState(currentState) {
  switch (currentState) {
    case STATES.UPLOAD: return 1
    case STATES.VIBE: return 2
    case STATES.RESULT: return 4
    default: return 1
  }
}

/**
 * Gets step configuration by number
 * @param {number} stepNumber - Step number
 * @returns {Object} - Step configuration
 */
export function getStepConfig(stepNumber) {
  return STEPS.find(step => step.id === stepNumber) || STEPS[0]
}

/**
 * Checks if a step is completed
 * @param {number} stepNumber - Step to check
 * @param {number} currentStep - Current step
 * @returns {boolean} - Whether step is completed
 */
export function isStepCompleted(stepNumber, currentStep) {
  return currentStep > stepNumber
}

/**
 * Checks if a step is current
 * @param {number} stepNumber - Step to check
 * @param {number} currentStep - Current step
 * @returns {boolean} - Whether step is current
 */
export function isStepCurrent(stepNumber, currentStep) {
  return currentStep === stepNumber
}

/**
 * Gets next state from current state
 * @param {string} currentState - Current state
 * @returns {string} - Next state
 */
export function getNextState(currentState) {
  switch (currentState) {
    case STATES.UPLOAD: return STATES.VIBE
    case STATES.VIBE: return STATES.RESULT
    case STATES.RESULT: return STATES.UPLOAD
    default: return STATES.UPLOAD
  }
}

/**
 * Gets previous state from current state
 * @param {string} currentState - Current state
 * @returns {string} - Previous state
 */
export function getPreviousState(currentState) {
  switch (currentState) {
    case STATES.VIBE: return STATES.UPLOAD
    case STATES.RESULT: return STATES.VIBE
    case STATES.UPLOAD: return STATES.UPLOAD
    default: return STATES.UPLOAD
  }
}
