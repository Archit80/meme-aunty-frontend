import { useState, useEffect } from "react"

/**
 * Custom hook for managing localStorage with JSON serialization
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value if not found in localStorage
 * @returns {[value, setValue]} - current value and setter function
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Custom hook for debouncing a value
 * @param {*} value - value to debounce
 * @param {number} delay - delay in milliseconds
 * @returns {*} - debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook for handling async operations
 * @returns {Object} - state object with loading, error, and execute function
 */
export function useAsync() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const execute = async (asyncFunction) => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setData(null)
  }

  return { loading, error, data, execute, reset }
}

/**
 * Custom hook for managing previous value
 * @param {*} value - current value
 * @returns {*} - previous value
 */
export function usePrevious(value) {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState()

  if (value !== current) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}

/**
 * Custom hook for copy to clipboard functionality
 * @returns {Object} - copy function and copied state
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return true
    } catch (err) {
      console.error('Failed to copy text:', err)
      return false
    }
  }

  return { copy, copied }
}
