
import { useQuery } from "@tanstack/react-query";
import { Weather } from "@/components/Weather";
import { useEffect, useState } from "react";
import { Geolocation } from '@capacitor/geolocation';
import { useToast } from "@/components/ui/use-toast";

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
      };
    },
    enabled: !!location,
  });

  return <Weather data={data} isLoading={isLoading} />;
};

export default Index;
