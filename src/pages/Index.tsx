
import { useQuery } from "@tanstack/react-query";
import { Weather } from "@/components/Weather";
import { useEffect, useState } from "react";
import { Geolocation } from '@capacitor/geolocation';
import { useToast } from "@/components/ui/use-toast";
import { WeatherData } from "@/types/weather";

const Index = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      } catch (error) {
        toast({
          title: "Error getting location",
          description: "Please enable location services to get weather data.",
          variant: "destructive",
        });
      }
    };

    getCurrentPosition();
  }, [toast]);

  const { data, isLoading } = useQuery({
    queryKey: ["weather", location?.lat, location?.lon],
    queryFn: async () => {
      // This is mock data - in a real app, you would fetch from a weather API
      return {
        location: "San Francisco",
        temperature: 22,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        feelsLike: 23,
        forecast: [
          { day: "Today", high: 24, low: 18, condition: "Partly Cloudy" },
          { day: "Tomorrow", high: 25, low: 17, condition: "Sunny" },
          { day: "Wednesday", high: 22, low: 16, condition: "Rain" },
          { day: "Thursday", high: 20, low: 15, condition: "Thunderstorm" },
          { day: "Friday", high: 21, low: 16, condition: "Cloudy" }
        ],
        uvIndex: 6,
        precipitation: 20,
        airQuality: "Good",
        sunriseTime: "06:45 AM",
        sunsetTime: "07:30 PM",
        moonPhase: "Waxing Crescent",
        pressure: 1015,
      } as WeatherData;
    },
    enabled: !!location,
  });

  return <Weather data={data} isLoading={isLoading} />;
};

export default Index;
