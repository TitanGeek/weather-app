import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface CurrentWeatherProps {
  data: any
  city: string
  language?: string
}

export default function CurrentWeather({ data, city, language = "en" }: CurrentWeatherProps) {
  if (!data) return null

  const temperature = Math.round(data.temp)
  const feelsLike = Math.round(data.feels_like)
  const humidity = data.humidity
  const windSpeed = data.wind_speed
  const weatherMain = data.weather[0].main
  const weatherDescription = data.weather[0].description

  const translations = {
    title: {
      en: "Updated just now",
      hi: "अभी अपडेट किया गया",
      ta: "இப்போது புதுப்பிக்கப்பட்டது",
      te: "ఇప్పుడే నవీకరించబడింది",
      bn: "এইমাত্র আপডেট করা হয়েছে",
    },
    feelsLike: {
      en: "Feels like",
      hi: "महसूस होता है",
      ta: "உணர்கிறது",
      te: "అనిపిస్తుంది",
      bn: "অনুভূত হয়",
    },
    humidity: {
      en: "Humidity",
      hi: "आर्द्रता",
      ta: "ஈரப்பதம்",
      te: "తేమ",
      bn: "আর্দ্রতা",
    },
    wind: {
      en: "Wind",
      hi: "हवा",
      ta: "காற்று",
      te: "గాలి",
      bn: "বাতাস",
    },
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "clouds":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rain":
      case "drizzle":
        return <Droplets className="h-8 w-8 text-blue-500" />
      default:
        return <Thermometer className="h-8 w-8 text-red-500" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{city}</CardTitle>
            <CardDescription>{formatDate(data.dt, language)}</CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            {translations.title[language] || translations.title.en}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {getWeatherIcon(weatherMain)}
            <div>
              <div className="text-4xl font-bold">{temperature}°C</div>
              <div className="text-muted-foreground capitalize">{weatherDescription}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-muted-foreground" />
              <span>
                {translations.feelsLike[language] || translations.feelsLike.en} {feelsLike}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-muted-foreground" />
              <span>
                {translations.humidity[language] || translations.humidity.en} {humidity}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-muted-foreground" />
              <span>
                {translations.wind[language] || translations.wind.en} {windSpeed} m/s
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
