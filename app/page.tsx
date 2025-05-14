"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import WeatherScene from "@/components/weather-scene"
import CurrentWeather from "@/components/current-weather"
import FiveDayForecast from "@/components/five-day-forecast"
import HourlyForecast from "@/components/hourly-forecast"
import WeatherAlerts from "@/components/weather-alerts"
import AirQuality from "@/components/air-quality"
import WeatherImpact from "@/components/weather-impact"
import { useTheme } from "next-themes"
import { popularIndianCities } from "@/lib/cities"
import { fetchWeatherData } from "@/lib/weather-api"
import { Button } from "@/components/ui/button"

export default function WeatherApp() {
  const [city, setCity] = useState("Chennai")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [offlineMode, setOfflineMode] = useState(false)
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check if we're offline
        if (!navigator.onLine) {
          setOfflineMode(true)
          // Get cached data
          const cachedData = localStorage.getItem(`weather_${city}`)
          if (cachedData) {
            setWeatherData(JSON.parse(cachedData))
          } else {
            setError("No cached data available for offline mode")
          }
          setLoading(false)
          return
        }

        setOfflineMode(false)
        const data = await fetchWeatherData(city)
        setWeatherData(data)

        // Cache the data for offline use
        localStorage.setItem(`weather_${city}`, JSON.stringify(data))

        // Set up refresh interval (every 5 minutes)
        const refreshInterval = setInterval(
          () => {
            getWeatherData()
          },
          5 * 60 * 1000,
        )

        return () => clearInterval(refreshInterval)
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()
  }, [city])

  const handleCityChange = (value) => {
    setCity(value)
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    console.log("Toggling theme to:", theme === "dark" ? "light" : "dark")
  }

  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Weather Forecast</h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={city} onValueChange={handleCityChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {popularIndianCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  const searchCity = prompt("Enter city name:")
                  if (searchCity && searchCity.trim() !== "") {
                    setCity(searchCity.trim())
                  }
                }}
              >
                Search
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {offlineMode && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Offline Mode</AlertTitle>
            <AlertDescription>
              You are currently viewing cached data. Connect to the internet for the latest updates.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          weatherData && (
            <>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <WeatherScene weatherCondition={weatherData?.current?.weather[0]?.main} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CurrentWeather data={weatherData?.current} city={city} language={language} />
                <WeatherImpact weatherData={weatherData} language={language} />
              </div>

              <Tabs defaultValue="hourly" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="hourly">
                    {language === "en"
                      ? "Hourly Forecast"
                      : language === "hi"
                        ? "घंटे का पूर्वानुमान"
                        : language === "ta"
                          ? "மணிநேர முன்னறிவிப்பு"
                          : language === "te"
                            ? "గంటల వారీగా సూచన"
                            : language === "bn"
                              ? "ঘন্টার পূর্বাভাস"
                              : "Hourly Forecast"}
                  </TabsTrigger>
                  <TabsTrigger value="daily">
                    {language === "en"
                      ? "5-Day Forecast"
                      : language === "hi"
                        ? "5-दिन का पूर्वानुमान"
                        : language === "ta"
                          ? "5-நாள் முன்னறிவிப்பு"
                          : language === "te"
                            ? "5-రోజుల సూచన"
                            : language === "bn"
                              ? "5-দিনের পূর্বাভাস"
                              : "5-Day Forecast"}
                  </TabsTrigger>
                  <TabsTrigger value="details">
                    {language === "en"
                      ? "Details & Alerts"
                      : language === "hi"
                        ? "विवरण और अलर्ट"
                        : language === "ta"
                          ? "விவரங்கள் & எச்சரிக்கைகள்"
                          : language === "te"
                            ? "వివరాలు & హెచ్చరికలు"
                            : language === "bn"
                              ? "বিবরণ এবং সতর্কতা"
                              : "Details & Alerts"}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="hourly">
                  <HourlyForecast data={weatherData?.hourly} language={language} />
                </TabsContent>
                <TabsContent value="daily">
                  <FiveDayForecast data={weatherData?.daily} language={language} />
                </TabsContent>
                <TabsContent value="details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AirQuality data={weatherData?.airQuality} language={language} />
                    <WeatherAlerts alerts={weatherData?.alerts} language={language} />
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )
        )}
      </div>
    </main>
  )
}
