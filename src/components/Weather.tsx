
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Droplets, Gauge, Leaf, Moon, Sunrise, Sunset, ThermometerSun, Umbrella, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-handwriting text-white"
        >
          Looking outside...
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="font-mono dark min-h-screen overflow-hidden relative backdrop-blur-sm">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 bg-black"></div>
      <div className="fixed inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-30"></div>
      
      {/* Geometric shapes */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1 }}
        className="fixed top-20 left-10 w-40 h-40 rounded-full border-2 border-white opacity-15 -z-5"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="fixed bottom-20 right-10 w-60 h-60 bg-white/5 opacity-15 -z-5"
      ></motion.div>
      
      <div className="container mx-auto px-4 py-6 z-10">
        {/* Header */}
        <header className="mb-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-white text-opacity-90 font-handwriting text-4xl tracking-wide">{time}</h1>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white text-opacity-80 font-mono text-lg bg-white/10 px-3 py-1 rounded-full backdrop-blur-md"
              >
                {data.location}
              </motion.div>
            </div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Current Weather */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-lg rounded-3xl border border-white/10"
          >
            <div className="w-40 h-40 relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-25 text-amber-200"
              >
                {weatherIcons[data.condition] || <Cloud className="w-full h-full" />}
              </motion.div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute inset-0 text-white"
              >
                {weatherIcons[data.condition] || <Cloud className="w-full h-full" />}
              </motion.div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <p className="font-handwriting text-3xl text-white mb-2">{data.condition}</p>
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                <motion.h2 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 5
                  }}
                  className="font-display text-8xl font-bold text-white tracking-tight"
                >
                  {Math.round(data.temperature)}°
                </motion.h2>
                <div className="text-white/80 text-lg">
                  <p>Feels like {Math.round(data.feelsLike)}°</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-300" />
                  <span>{data.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-blue-200" />
                  <span>{data.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Umbrella className="w-4 h-4 text-purple-300" />
                  <span>{data.precipitation}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-green-300" />
                  <span>{data.pressure} hPa</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Forecast */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-4 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
          >
            <h2 className="font-handwriting text-2xl text-white mb-4">5-Day Forecast</h2>
            <Carousel
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent>
                {data.forecast.map((day, index) => (
                  <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="p-3 bg-gradient-to-b from-white/10 to-transparent rounded-xl border border-white/10 text-white h-full"
                    >
                      <p className="font-serif text-lg mb-2">{day.day}</p>
                      <div className="text-center mb-2 text-white/80">
                        {weatherIcons[day.condition] ? (
                          <div className="w-12 h-12 mx-auto">
                            {weatherIcons[day.condition]}
                          </div>
                        ) : (
                          <Cloud className="w-12 h-12 mx-auto" />
                        )}
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-white">{day.high}°</span>
                        <span className="text-white/60">{day.low}°</span>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mx-2 bg-black/80 border-white/20" />
                <CarouselNext className="relative static mx-2 bg-black/80 border-white/20" />
              </div>
            </Carousel>
          </motion.section>

          {/* Details */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DetailCard 
                title="UV Index" 
                value={`${data.uvIndex} / 10`} 
                icon={<ThermometerSun className="w-6 h-6 text-yellow-300" />} 
                delay={0.1} 
              />
              <DetailCard 
                title="Air Quality" 
                value={data.airQuality} 
                icon={<Leaf className="w-6 h-6 text-green-400" />} 
                delay={0.2} 
              />
              <DetailCard 
                title="Sun" 
                value={`↑ ${data.sunriseTime} / ↓ ${data.sunsetTime}`} 
                icon={<Sunrise className="w-6 h-6 text-amber-300" />} 
                delay={0.3} 
              />
              <DetailCard 
                title="Moon Phase" 
                value={data.moonPhase} 
                icon={<Moon className="w-6 h-6 text-blue-300" />} 
                delay={0.4} 
              />
            </div>
          </motion.section>
          
          {/* Handwritten Notes */}
          <motion.section 
            initial={{ opacity: 0, rotate: -2, y: 50 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="p-6 bg-yellow-100/10 backdrop-blur-sm rounded-lg transform -rotate-2 border-2 border-yellow-100/30 text-white/90 font-handwriting"
          >
            <p className="text-xl">
              {data.condition === "Rain" ? 
                "Don't forget your umbrella today! ☔️" : 
                data.condition === "Sunny" ? 
                "Perfect day for a walk! Remember sunscreen! 🌞" : 
                "Check forecast before going out! 🌤️"}
            </p>
            <div className="mt-3 flex justify-end">
              <div className="h-px w-20 bg-white/40"></div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-white/40 text-xs border-t border-white/10 pt-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Designed with 🖤 | Weather data updated as of today
          </motion.p>
        </footer>
      </div>
    </div>
  );
}

interface DetailCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay: number;
}

function DetailCard({ title, value, icon, delay }: DetailCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      className="p-4 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10"
    >
      <div className="flex items-center gap-3 text-white">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wider">{title}</p>
          <p className="text-lg font-serif">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
