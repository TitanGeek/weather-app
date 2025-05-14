import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bike, Car, Umbrella } from "lucide-react"

interface WeatherImpactProps {
  weatherData: any
  language?: string
}

export default function WeatherImpact({ weatherData, language = "en" }: WeatherImpactProps) {
  if (!weatherData) return null

  const translations = {
    title: {
      en: "ML Weather Impact Prediction",
      hi: "एमएल मौसम प्रभाव भविष्यवाणी",
      ta: "ML வானிலை தாக்க கணிப்பு",
      te: "ML వాతావరణ ప్రభావ అంచనా",
      bn: "এমএল আবহাওয়া প্রভাব পূর্বাভাস",
    },
    description: {
      en: "Our ML model predicts how today's weather will impact your activities:",
      hi: "हमारा एमएल मॉडल भविष्यवाणी करता है कि आज का मौसम आपकी गतिविधियों को कैसे प्रभावित करेगा:",
      ta: "இன்றைய வானிலை உங்கள் செயல்பாடுகளை எவ்வாறு பாதிக்கும் என்பதை எங்கள் ML மாதிரி கணிக்கிறது:",
      te: "నేటి వాతావరణం మీ కార్యకలాపాలను ఎలా ప్రభావితం చేస్తుందో మా ML మోడల్ అంచనా వేస్తుంది:",
      bn: "আমাদের এমএল মডেল পূর্বাভাস দেয় যে আজকের আবহাওয়া আপনার কার্যক্রমগুলিকে কীভাবে প্রভাবিত করবে:",
    },
    activities: {
      outdoor: {
        en: "Outdoor Activities",
        hi: "बाहरी गतिविधियां",
        ta: "வெளிப்புற செயல்பாடுகள்",
        te: "బయటి కార్యకలాపాలు",
        bn: "বাইরের কার্যক্রম",
      },
      cycling: {
        en: "Cycling Conditions",
        hi: "साइकिल चलाने की स्थिति",
        ta: "சைக்கிள் நிலைமைகள்",
        te: "సైక్లింగ్ పరిస్థితులు",
        bn: "সাইক্লিং অবস্থা",
      },
      driving: {
        en: "Driving Conditions",
        hi: "ड्राइविंग की स्थिति",
        ta: "வாகன ஓட்டும் நிலைமைகள்",
        te: "డ్రైవింగ్ పరిస్థితులు",
        bn: "গাড়ি চালানোর অবস্থা",
      },
    },
  }

  // ML-based Weather Impact Score (simulated)
  // In a real app, this would use a trained model
  const calculateImpactScore = (activity: string) => {
    const current = weatherData.current
    const temp = current.temp
    const humidity = current.humidity
    const windSpeed = current.wind_speed
    const weatherCondition = current.weather[0].main.toLowerCase()
    const rainProbability = weatherData.hourly[0].pop

    let score = 100 // Start with perfect score

    // Temperature impact
    if (activity === "outdoor" || activity === "cycling") {
      if (temp < 10) score -= 30
      else if (temp < 15) score -= 15
      else if (temp > 35) score -= 40
      else if (temp > 30) score -= 20
    }

    // Rain impact
    if (weatherCondition === "rain" || weatherCondition === "drizzle") {
      if (activity === "outdoor") score -= 50
      if (activity === "cycling") score -= 60
      if (activity === "driving") score -= 20
    }

    // Wind impact
    if (windSpeed > 10) {
      if (activity === "outdoor") score -= 20
      if (activity === "cycling") score -= 40
    }

    // Rain probability impact
    if (rainProbability > 0.5) {
      if (activity === "outdoor") score -= 30 * rainProbability
      if (activity === "cycling") score -= 40 * rainProbability
      if (activity === "driving") score -= 15 * rainProbability
    }

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    if (score >= 40) return "text-orange-500"
    return "text-red-500"
  }

  const outdoorScore = calculateImpactScore("outdoor")
  const cyclingScore = calculateImpactScore("cycling")
  const drivingScore = calculateImpactScore("driving")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.title[language] || translations.title.en}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {translations.description[language] || translations.description.en}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <Umbrella className="h-8 w-8 mb-2" />
              <div className="text-sm font-medium">
                {translations.activities.outdoor[language] || translations.activities.outdoor.en}
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(outdoorScore)}`}>{outdoorScore}%</div>
            </div>

            <div className="border rounded-lg p-4 flex flex-col items-center">
              <Bike className="h-8 w-8 mb-2" />
              <div className="text-sm font-medium">
                {translations.activities.cycling[language] || translations.activities.cycling.en}
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(cyclingScore)}`}>{cyclingScore}%</div>
            </div>

            <div className="border rounded-lg p-4 flex flex-col items-center">
              <Car className="h-8 w-8 mb-2" />
              <div className="text-sm font-medium">
                {translations.activities.driving[language] || translations.activities.driving.en}
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(drivingScore)}`}>{drivingScore}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
