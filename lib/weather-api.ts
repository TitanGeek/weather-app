// This is a mock API service for the weather app
// In a real application, you would replace this with actual API calls

export async function fetchWeatherData(city: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate mock data based on the city
  const now = Math.floor(Date.now() / 1000)
  const isRainy = Math.random() > 0.7
  const isCloudy = Math.random() > 0.5
  const hasSevereWeather = Math.random() > 0.8

  // Generate temperature based on city (simulating regional differences)
  let baseTemp = 25 // Default base temperature

  if (city === "Chennai") {
    baseTemp = 32
  } else if (city === "Delhi") {
    baseTemp = 30
  } else if (city === "Mumbai") {
    baseTemp = 29
  } else if (city === "Bangalore") {
    baseTemp = 24
  } else if (city === "Kolkata") {
    baseTemp = 28
  }

  // Add some randomness to the temperature
  const currentTemp = baseTemp + (Math.random() * 6 - 3)

  // Generate weather condition
  let weatherCondition = "Clear"
  if (isRainy) {
    weatherCondition = "Rain"
  } else if (isCloudy) {
    weatherCondition = "Clouds"
  }

  // Generate alerts based on conditions
  const alerts = []

  if (isRainy && hasSevereWeather) {
    alerts.push({
      event: "Heavy Rain Warning",
      description: "Heavy rainfall expected in the next 24 hours. Potential for localized flooding in low-lying areas.",
    })

    if (Math.random() > 0.5) {
      alerts.push({
        event: "Flash Flood Alert",
        description:
          "Flash flooding possible in urban areas and near small streams. Avoid low water crossings and be prepared to move to higher ground.",
      })
    }
  }

  if (currentTemp > 38 && hasSevereWeather) {
    alerts.push({
      event: "Extreme Heat Warning",
      description:
        "Dangerously high temperatures expected. Stay hydrated and avoid prolonged exposure to the sun. Check on vulnerable individuals.",
    })
  }

  if (Math.random() > 0.9 && hasSevereWeather) {
    alerts.push({
      event: "Thunderstorm Warning",
      description:
        "Severe thunderstorms possible with lightning, strong winds, and hail. Seek shelter indoors and stay away from windows.",
    })
  }

  // Generate mock data
  return {
    current: {
      dt: now,
      temp: currentTemp,
      feels_like: currentTemp - 2 + Math.random() * 4,
      humidity: Math.floor(60 + Math.random() * 30),
      wind_speed: 2 + Math.random() * 8,
      weather: [
        {
          main: weatherCondition,
          description: weatherCondition.toLowerCase(),
        },
      ],
    },
    hourly: Array(24)
      .fill(0)
      .map((_, i) => ({
        dt: now + i * 3600,
        temp: currentTemp + Math.sin(i * 0.5) * 3,
        pop: isRainy ? 0.1 + Math.random() * 0.6 : Math.random() * 0.3,
        weather: [
          {
            main: i < 6 && isRainy ? "Rain" : weatherCondition,
            description: i < 6 && isRainy ? "light rain" : weatherCondition.toLowerCase(),
          },
        ],
      })),
    daily: Array(7)
      .fill(0)
      .map((_, i) => ({
        dt: now + i * 86400,
        temp: {
          day: currentTemp + (Math.random() * 6 - 3),
          night: currentTemp - 5 + (Math.random() * 4 - 2),
        },
        pop: Math.random() * 0.7,
        wind_speed: 2 + Math.random() * 8,
        weather: [
          {
            main: Math.random() > 0.7 ? "Rain" : Math.random() > 0.5 ? "Clouds" : "Clear",
            description: Math.random() > 0.7 ? "light rain" : Math.random() > 0.5 ? "scattered clouds" : "clear sky",
          },
        ],
      })),
    alerts: alerts,
    airQuality: {
      aqi: Math.floor(Math.random() * 5) + 1,
      pm2_5: Math.floor(10 + Math.random() * 40),
      pm10: Math.floor(20 + Math.random() * 60),
      no2: Math.floor(5 + Math.random() * 30),
      o3: Math.floor(30 + Math.random() * 70),
    },
  }
}
