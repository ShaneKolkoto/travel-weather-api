import { Weather } from '../types';
import { OpenMeteoService } from './openmeteoService';

export class WeatherService {
  private openMeteoService: OpenMeteoService;

  constructor() {
    this.openMeteoService = new OpenMeteoService();
  }

  async getWeather(latitude: number, longitude: number, stationId?: string): Promise<Weather> {
    // If stationId is provided, use OpenMeteo API
    if (stationId) {
      try {
        return await this.openMeteoService.getWeatherData(stationId);
      } catch (error) {
        console.error('OpenMeteo API failed, falling back to mock data');
        return this.getMockWeatherByLocation(latitude, longitude);
      }
    }
    
    // Fallback to mock data based on location
    return this.getMockWeatherByLocation(latitude, longitude);
  }

  private getMockWeatherByLocation(latitude: number, longitude: number): Weather {
    // More realistic mock based on latitude and longitude
    let baseTemp = 20;
    
    // Adjust base temperature based on latitude
    if (latitude > 40) baseTemp = 10; // Northern regions cooler
    if (latitude > 60) baseTemp = 5;  // Very northern regions even cooler
    if (latitude < -20) baseTemp = 25; // Southern regions warmer
    if (latitude < -40) baseTemp = 30; // Very southern regions even warmer
    
    // Adjust for coastal vs inland based on longitude distribution
    // Coastal areas tend to have more moderate temperatures
    const isCoastal = Math.abs(longitude % 180) > 150; // Simple coastal detection
    
    if (isCoastal) {
      baseTemp += 5; // Coastal areas slightly warmer
    }
    
    const temperature = baseTemp + (Math.random() * 15 - 7.5); // +/- 7.5 degrees
    let humidity;
    humidity = 40 + Math.random() * 40;
    
    // Adjust humidity based on coastal/rainforest areas
    // Areas near 0 longitude (Africa/Amazon) tend to be more humid
    if (Math.abs(longitude) < 30 && Math.abs(latitude) < 30) {
      humidity = 60 + Math.random() * 35; // Tropical regions more humid
    }
    
    // Determine weather condition
    let condition = 'Cloudy';
    if (temperature > 25) condition = 'Sunny';
    if (temperature < 5) condition = 'Snowy';
    if (humidity > 80 && temperature > 0) condition = 'Rainy';
    if (humidity > 90) condition = 'Rainy'; // Very humid = likely rainy
    
    // Adjust pressure based on conditions
    let pressure = 1013;
    if (condition === 'Sunny') pressure += 10 + Math.random() * 10;
    if (condition === 'Rainy') pressure -= 10 + Math.random() * 10;
    
    return {
      temperature: parseFloat(temperature.toFixed(1)),
      condition,
      isSunny: condition === 'Sunny',
      isRainy: condition === 'Rainy',
      isSnowy: condition === 'Snowy',
      humidity: Math.round(humidity),
      pressure: Math.round(pressure)
    };
  }
}