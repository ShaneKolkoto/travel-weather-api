export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  stationId?: string; // Added for OpenMeteo station ID
}