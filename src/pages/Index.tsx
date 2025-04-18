
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
        const coordinates = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
        });
        
        setLocation({
          lat: coordinates.coords.latitude,
          lon: coordinates.coords.longitude,
        });
        
        // For demonstration, we'll reverse geocode using a mock
        // In a real app, you would use a geocoding service
        const cityName = await getCityName(coordinates.coords.latitude, coordinates.coords.longitude);
        console.log("Location detected:", cityName);
      } catch (error) {
        console.error("Location error:", error);
        toast({
          title: "Location services unavailable",
          description: "Please enable location access to get accurate weather data.",
          variant: "destructive",
        });
      }
    };

    getCurrentPosition();
  }, [toast]);

  // Mock function to simulate reverse geocoding
  const getCityName = async (lat: number, lon: number) => {
    // In a real app, you would call a geocoding API here
    return "Current Location";
  };

  const { data, isLoading } = useQuery({
    queryKey: ["weather", location?.lat, location?.lon],
    queryFn: async () => {
      // This is mock data - in a real app, you would fetch from a weather API
      return {
        location: "Current Location",
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
