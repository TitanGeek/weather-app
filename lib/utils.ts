import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(timestamp: number, language = "en"): string {
  const date = new Date(timestamp * 1000)

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }

  let locale = "en-US"
  switch (language) {
    case "hi":
      locale = "hi-IN"
      break
    case "ta":
      locale = "ta-IN"
      break
    case "te":
      locale = "te-IN"
      break
    case "bn":
      locale = "bn-IN"
      break
    default:
      locale = "en-US"
  }

  return date.toLocaleDateString(locale, options)
}

export function formatDay(timestamp: number, language = "en"): string {
  const date = new Date(timestamp * 1000)

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
  }

  let locale = "en-US"
  switch (language) {
    case "hi":
      locale = "hi-IN"
      break
    case "ta":
      locale = "ta-IN"
      break
    case "te":
      locale = "te-IN"
      break
    case "bn":
      locale = "bn-IN"
      break
    default:
      locale = "en-US"
  }

  return date.toLocaleDateString(locale, options)
}

export function formatHour(timestamp: number, language = "en"): string {
  const date = new Date(timestamp * 1000)

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: true,
  }

  let locale = "en-US"
  switch (language) {
    case "hi":
      locale = "hi-IN"
      break
    case "ta":
      locale = "ta-IN"
      break
    case "te":
      locale = "te-IN"
      break
    case "bn":
      locale = "bn-IN"
      break
    default:
      locale = "en-US"
  }

  return date.toLocaleTimeString(locale, options)
}
