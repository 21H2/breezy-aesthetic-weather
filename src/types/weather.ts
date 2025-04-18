
export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  forecast: ForecastDay[];
  uvIndex: number;
  precipitation: number;
  airQuality: string;
  sunriseTime: string;
  sunsetTime: string;
  moonPhase: string;
  pressure: number;
}
