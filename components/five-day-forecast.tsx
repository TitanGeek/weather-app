import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Sun, Thermometer, Umbrella, Wind } from "lucide-react"
import { formatDay } from "@/lib/utils"

interface FiveDayForecastProps {
  data: any[]
  language?: string
}

export default function FiveDayForecast({ data, language = "en" }: FiveDayForecastProps) {
  if (!data || data.length === 0) return null

  // Take only the first 5 days
  const fiveDayData = data.slice(0, 5)

  const translations = {
    title: {
      en: "5-Day Forecast",
      hi: "5-दिन का पूर्वानुमान",
      ta: "5-நாள் முன்னறிவிப்பு",
      te: "5-రోజుల సూచన",
      bn: "5-দিনের পূর্বাভাস",
    },
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "clouds":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rain":
      case "drizzle":
        return <Droplets className="h-6 w-6 text-blue-500" />
      default:
        return <Thermometer className="h-6 w-6 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.title[language] || translations.title.en}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {fiveDayData.map((day, index) => (
            <div key={index} className="flex flex-col items-center p-3 border rounded-lg">
              <div className="font-medium">{formatDay(day.dt, language)}</div>
              <div className="my-2">{getWeatherIcon(day.weather[0].main)}</div>
              <div className="text-xl font-bold">{Math.round(day.temp.day)}°C</div>
              <div className="text-sm text-muted-foreground capitalize">{day.weather[0].description}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 w-full text-xs">
                <div className="flex items-center gap-1">
                  <Umbrella className="h-3 w-3" />
                  <span>{Math.round(day.pop * 100)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-3 w-3" />
                  <span>{day.wind_speed} m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
