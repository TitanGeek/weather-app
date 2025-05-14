import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AirQualityProps {
  data: any
  language?: string
}

export default function AirQuality({ data, language = "en" }: AirQualityProps) {
  if (!data) return null

  const translations = {
    title: {
      en: "Air Quality & Wind",
      hi: "वायु गुणवत्ता और हवा",
      ta: "காற்று தரம் & காற்று",
      te: "గాలి నాణ్యత & గాలి",
      bn: "বায়ু মান এবং বাতাস",
    },
    aqi: {
      en: "Air Quality Index",
      hi: "वायु गुणवत्ता सूचकांक",
      ta: "காற்று தர குறியீடு",
      te: "గాలి నాణ్యత సూచిక",
      bn: "বায়ু মান সূচক",
    },
    levels: {
      good: {
        en: "Good",
        hi: "अच्छा",
        ta: "நல்லது",
        te: "మంచిది",
        bn: "ভালো",
      },
      fair: {
        en: "Fair",
        hi: "उचित",
        ta: "நியாயமான",
        te: "సమంజసం",
        bn: "মোটামুটি",
      },
      moderate: {
        en: "Moderate",
        hi: "मध्यम",
        ta: "மிதமான",
        te: "మధ్యస్థం",
        bn: "মাঝারি",
      },
      poor: {
        en: "Poor",
        hi: "खराब",
        ta: "மோசமான",
        te: "పేద",
        bn: "খারাপ",
      },
      veryPoor: {
        en: "Very Poor",
        hi: "बहुत खराब",
        ta: "மிகவும் மோசமான",
        te: "చాలా పేద",
        bn: "অত্যন্ত খারাপ",
      },
    },
  }

  const getAQILevel = (aqi: number) => {
    switch (aqi) {
      case 1:
        return {
          label: translations.levels.good[language] || translations.levels.good.en,
          color: "bg-green-500",
        }
      case 2:
        return {
          label: translations.levels.fair[language] || translations.levels.fair.en,
          color: "bg-yellow-500",
        }
      case 3:
        return {
          label: translations.levels.moderate[language] || translations.levels.moderate.en,
          color: "bg-orange-500",
        }
      case 4:
        return {
          label: translations.levels.poor[language] || translations.levels.poor.en,
          color: "bg-red-500",
        }
      case 5:
        return {
          label: translations.levels.veryPoor[language] || translations.levels.veryPoor.en,
          color: "bg-purple-500",
        }
      default:
        return {
          label: "Unknown",
          color: "bg-gray-500",
        }
    }
  }

  const aqiInfo = getAQILevel(data.aqi)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.title[language] || translations.title.en}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{translations.aqi[language] || translations.aqi.en}</span>
            <span className="text-sm font-medium">{aqiInfo.label}</span>
          </div>
          <Progress value={(data.aqi / 5) * 100} className={aqiInfo.color} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3">
            <div className="text-sm text-muted-foreground">PM2.5</div>
            <div className="text-xl font-bold">{data.pm2_5} µg/m³</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm text-muted-foreground">PM10</div>
            <div className="text-xl font-bold">{data.pm10} µg/m³</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm text-muted-foreground">NO₂</div>
            <div className="text-xl font-bold">{data.no2} µg/m³</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="text-sm text-muted-foreground">O₃</div>
            <div className="text-xl font-bold">{data.o3} µg/m³</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
