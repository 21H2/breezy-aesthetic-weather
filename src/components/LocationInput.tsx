
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LocationInputProps {
  onLocationSubmit: (location: string) => void;
}

export function LocationInput({ onLocationSubmit }: LocationInputProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSubmit(location.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="font-handwriting text-2xl">Enter Your Location</h2>
          <p className="text-sm text-white/60">
            Please enter a city name or PIN code
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name or PIN code"
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
          <Button 
            type="submit" 
            variant="secondary"
            className="bg-white/10 hover:bg-white/20"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
