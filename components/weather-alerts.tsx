import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WeatherAlertsProps {
  alerts: any[]
  language?: string
}

export default function WeatherAlerts({ alerts, language = "en" }: WeatherAlertsProps) {
  const translations = {
    title: {
      en: "Weather Alerts",
      hi: "मौसम अलर्ट",
      ta: "வானிலை எச்சரிக்கைகள்",
      te: "వాతావరణ హెచ్చరికలు",
      bn: "আবহাওয়া সতর্কতা",
    },
    noAlerts: {
      en: "No active weather alerts for this location.",
      hi: "इस स्थान के लिए कोई सक्रिय मौसम अलर्ट नहीं है।",
      ta: "இந்த இடத்திற்கு செயலில் உள்ள வானிலை எச்சரிக்கைகள் எதுவும் இல்லை.",
      te: "ఈ ప్రాంతానికి చురుకైన వాతావరణ హెచ్చరికలు లేవు.",
      bn: "এই অবস্থানের জন্য কোন সক্রিয় আবহাওয়া সতর্কতা নেই।",
    },
    active: {
      en: "ACTIVE",
      hi: "सक्रिय",
      ta: "செயலில்",
      te: "చురుకుగా",
      bn: "সক্রিয়",
    },
  }

  return (
    <Card className={alerts && alerts.length > 0 ? "border-red-500 shadow-md" : ""}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bell className={alerts && alerts.length > 0 ? "h-5 w-5 text-red-500 animate-pulse" : "h-5 w-5"} />
          {translations.title[language] || translations.title.en}
        </CardTitle>
        {alerts && alerts.length > 0 && (
          <Badge variant="destructive">{translations.active[language] || translations.active.en}</Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {!alerts || alerts.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            {translations.noAlerts[language] || translations.noAlerts.en}
          </div>
        ) : (
          alerts.map((alert, index) => (
            <Alert key={index} variant="destructive" className="animate-pulse-slow">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{alert.event}</AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                {alert.description.length > 150 ? `${alert.description.substring(0, 150)}...` : alert.description}
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  )
}
