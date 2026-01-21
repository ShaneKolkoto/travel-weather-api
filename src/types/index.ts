export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  stationId?: string; // Added for OpenMeteo station ID
}

export interface Weather {
  temperature: number;
  condition: string;
  isSunny: boolean;
  isRainy: boolean;
  isSnowy: boolean;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
}

export interface Activity {
  name: string;
  score: number;
  reason: string;
  recommended: boolean;
}

export interface TravelRecommendation {
  city: City;
  weather: Weather;
  activities: Activity[];
}

// OpenMeteo API response types
export interface OpenMeteoStationInfo {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  sensors: Array<{
    type: string;
    number: number;
    description: string;
  }>;
}

export interface OpenMeteoSensorData {
  [key: string]: any; // Flexible structure for different sensor types
}