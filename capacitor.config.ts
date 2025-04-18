
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d0d65b4b632040a8be55643ab7da1498',
  appName: 'breezy-aesthetic-weather',
  webDir: 'dist',
  server: {
    url: 'https://d0d65b4b-6320-40a8-be55-643ab7da1498.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ["location"]
    }
  }
};

export default config;
