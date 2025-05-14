import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Sun, Thermometer } from "lucide-react"
import { formatHour } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HourlyForecastProps {
  data: any[]
  language?: string
}

export default function HourlyForecast({ data, language = "en" }: HourlyForecastProps) {
  if (!data || data.length === 0) return null

  // Take only the first 24 hours
  const hourlyData = data.slice(0, 24)

  const translations = {
    title: {
      en: "24-Hour Forecast",
      hi: "24-घंटे का पूर्वानुमान",
      ta: "24-மணிநேர முன்னறிவிப்பு",
      te: "24-గంటల సూచన",
      bn: "24-ঘন্টার পূর্বাভাস",
    },
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "clouds":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rain":
      case "drizzle":
        return <Droplets className="h-5 w-5 text-blue-500" />
      default:
        return <Thermometer className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.title[language] || translations.title.en}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {hourlyData.map((hour, index) => (
              <div key={index} className="flex flex-col items-center p-3 border rounded-lg min-w-[80px]">
                <div className="font-medium">{formatHour(hour.dt, language)}</div>
                <div className="my-2">{getWeatherIcon(hour.weather[0].main)}</div>
                <div className="text-lg font-bold">{Math.round(hour.temp)}°C</div>
                <div className="text-xs text-muted-foreground">{Math.round(hour.pop * 100)}%</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
