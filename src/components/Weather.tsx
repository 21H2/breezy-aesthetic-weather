
import { Cloud, Droplets, ThermometerSun, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherProps {
  data?: WeatherData;
  isLoading: boolean;
}

export function Weather({ data, isLoading }: WeatherProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-blue-400">Loading weather data...</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-blue-400 to-purple-400">
      <div className="space-y-4">
        <div className="text-center text-white">
          <h1 className="text-3xl font-semibold mb-2">{data.location}</h1>
          <div className="text-6xl font-bold mb-4">{Math.round(data.temperature)}°</div>
          <p className="text-xl opacity-90">{data.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <WeatherCard
            icon={<ThermometerSun className="w-6 h-6" />}
            title="Feels Like"
            value={`${Math.round(data.feelsLike)}°`}
          />
          <WeatherCard
            icon={<Wind className="w-6 h-6" />}
            title="Wind Speed"
            value={`${data.windSpeed} km/h`}
          />
          <WeatherCard
            icon={<Droplets className="w-6 h-6" />}
            title="Humidity"
            value={`${data.humidity}%`}
          />
          <WeatherCard
            icon={<Cloud className="w-6 h-6" />}
            title="Condition"
            value={data.condition}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card className={cn(
      "p-4 backdrop-blur-lg bg-white/10 border-white/20",
      "transition-all duration-300 hover:bg-white/20"
    )}>
      <div className="flex items-center space-x-4 text-white">
        {icon}
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
}
