import { LocationService } from '../services/locationService';
import { WeatherService } from '../services/weatherService';
import { ActivityService } from '../services/activityService';

const locationService = new LocationService();
const weatherService = new WeatherService();
const activityService = new ActivityService();

export const resolvers = {
  Query: {
    suggestCities: (_: any, { input }: { input: string }) => {
      return locationService.suggestCities(input);
    },
    
    getWeather: async (_: any, { cityId }: { cityId: string }) => {
      const city = locationService.findCityById(cityId);
      if (!city) {
        throw new Error('City not found');
      }
      
      // Use stationId if available, otherwise use coordinates
      return weatherService.getWeather(
        city.latitude, 
        city.longitude, 
        city.stationId
      );
    },
    
  getActivities: async (_: any, { cityId }: { cityId: string }) => {
  const city = locationService.findCityById(cityId);
  if (!city) {
    throw new Error('City not found');
  }
  
  // Only pass stationId if it's a real station
  const stationId = city.real_station ? city.stationId : undefined;
  
  const weather = await weatherService.getWeather(
    city.latitude, 
    city.longitude, 
    stationId
  );
  return activityService.rankActivities(weather);
},
    
    travelRecommendation: async (_: any, { cityId }: { cityId: string }) => {
      const city = locationService.findCityById(cityId);
      if (!city) {
        throw new Error('City not found');
      }
      
      const weather = await weatherService.getWeather(
        city.latitude, 
        city.longitude, 
        city.stationId
      );
      const activities = activityService.rankActivities(weather);
      
      return {
        city,
        weather,
        activities
      };
    }
  }
};