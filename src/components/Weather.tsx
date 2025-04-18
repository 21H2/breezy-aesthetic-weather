import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Droplets, Gauge, Leaf, Moon, Sunrise, Sunset, ThermometerSun, Umbrella, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface WeatherProps {
  data?: WeatherData;
  isLoading: boolean;
}

const weatherIcons: Record<string, JSX.Element> = {
  "Sunny": <CloudSun className="w-full h-full" />,
  "Clear": <CloudSun className="w-full h-full" />,
  "Partly Cloudy": <Cloud className="w-full h-full" />,
  "Cloudy": <Cloud className="w-full h-full" />,
  "Rain": <CloudRain className="w-full h-full" />,
  "Drizzle": <CloudDrizzle className="w-full h-full" />,
  "Thunderstorm": <CloudLightning className="w-full h-full" />,
  "Snow": <CloudSnow className="w-full h-full" />,
};

export function Weather({ data, isLoading }: WeatherProps) {
  const [time, setTime] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="text-white font-handwriting text-3xl">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Looking outside...
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-80 z-0"
        style={{
          backgroundPosition: `0px ${scrollY * 0.5}px`,
        }}
      />
      
      <div className="relative z-10">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 backdrop-blur-lg bg-black/30 p-4 border-b border-white/10"
        >
          <div className="container mx-auto flex justify-between items-center">
            <motion.span 
              className="font-mono text-sm opacity-60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {time}
            </motion.span>
            <motion.h1 
              className="font-handwriting text-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {data.location}
            </motion.h1>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div 
              className="text-9xl font-light mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {Math.round(data.temperature)}°
            </motion.div>
            <div className="font-handwriting text-2xl opacity-80">{data.condition}</div>
            <div className="text-sm mt-2 opacity-60">Feels like {data.feelsLike}°</div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <MetricCard icon={<Droplets />} label="Humidity" value={`${data.humidity}%`} />
            <MetricCard icon={<Wind />} label="Wind" value={`${data.windSpeed} km/h`} />
            <MetricCard icon={<ThermometerSun />} label="UV Index" value={`${data.uvIndex}/10`} />
            <MetricCard icon={<Gauge />} label="Pressure" value={`${data.pressure} hPa`} />
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10"
          >
            <h2 className="font-handwriting text-xl mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.forecast.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-mono text-sm opacity-60">{day.day}</div>
                  <div className="my-2">
                    {weatherIcons[day.condition] || <Cloud className="w-8 h-8 mx-auto" />}
                  </div>
                  <div className="font-light">
                    <span className="text-lg">{day.high}°</span>
                    <span className="text-sm opacity-60 ml-2">{day.low}°</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs opacity-40 mt-8"
          >
            <p>Last updated: {time}</p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-white/60 mb-2"
      >
        {icon}
      </motion.div>
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-lg font-light">{value}</div>
    </motion.div>
  );
}
