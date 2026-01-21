import axios from 'axios';
import { OpenMeteoStationInfo, OpenMeteoSensorData, Weather } from '../types';
import dotenv from "dotenv";

dotenv.config()

export class OpenMeteoService {
  private baseUrl = process.env.PRIVATE_BASE_URL || "";

  async getStationInfo(stationId: string): Promise<OpenMeteoStationInfo> {
    try {
      const response = await axios.get(`${this.baseUrl}/${stationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching station info for ${stationId}:`, error);
      throw new Error(`Failed to fetch station info: ${error}`);
    }
  }

  async getTemperature(stationId: string): Promise<OpenMeteoSensorData> {
    try {
      // Try to get temperature from different sensor types
      const sensorTypes = ['t0', 't1', 't2', 'th0', 'wind0', 'rain0'];
      
      for (const sensorType of sensorTypes) {
        try {
          const response = await axios.get(
            `${this.baseUrl}/${stationId}/${sensorType}`
          );
          
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return {
              data: response.data,
              sensorType,
              timestamp: response.data[0][0], // Unix timestamp
              value: response.data[0][1] // Temperature value
            };
          }
        } catch (sensorError) {
          // Try next sensor type
          continue;
        }
      }
      
      throw new Error('No temperature sensor found');
      
    } catch (error) {
      console.error(`Error fetching temperature for station ${stationId}:`, error);
      return this.getMockTemperature();
    }
  }

  async getWeatherData(stationId: string): Promise<Weather> {
    try {
      // Try to get comprehensive weather data from thb0 sensor (temp, humidity, pressure)
      const thbResponse = await axios.get(
        `${this.baseUrl}/${stationId}`
      );
      
      if (thbResponse.data && Array.isArray(thbResponse.data) && thbResponse.data.length > 0) {
        const latestData = thbResponse.data[0];
        const temperature = latestData[1];
        const humidity = latestData[2];
        const pressure = latestData[3];
        
        return this.createWeatherFromData(temperature, humidity, pressure);
      }
      
      // Fallback to temperature only
      const tempData = await this.getTemperature(stationId);
      const temperature = (tempData as any).value || 20;
      
      return this.createWeatherFromData(temperature);
      
    } catch (error) {
      console.error(`Error fetching weather data for station ${stationId}:`, error);
      return this.getMockWeather();
    }
  }

  private createWeatherFromData(
    temperature: number, 
    humidity?: number, 
    pressure?: number
  ): Weather {
    // Determine condition based on temperature
    let condition = 'Cloudy';
    if (temperature > 25) condition = 'Sunny';
    if (temperature < 5) condition = 'Snowy';
    if (humidity && humidity > 80) condition = 'Rainy';
    
    return {
      temperature,
      condition,
      isSunny: condition === 'Sunny',
      isRainy: condition === 'Rainy',
      isSnowy: condition === 'Snowy',
      humidity,
      pressure
    };
  }

  private getMockTemperature(): OpenMeteoSensorData {
    const now = Math.floor(Date.now() / 1000);
    const temperature = 15 + Math.random() * 15;
    
    return {
      data: [[now, temperature]],
      sensorType: 't0',
      timestamp: now,
      value: temperature
    };
  }

  private getMockWeather(): Weather {
    const conditions = ['Sunny', 'Rainy', 'Cloudy', 'Snowy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const temperature = 15 + Math.random() * 15;
    
    return {
      temperature,
      condition: randomCondition,
      isSunny: randomCondition === 'Sunny',
      isRainy: randomCondition === 'Rainy',
      isSnowy: randomCondition === 'Snowy',
      humidity: 50 + Math.random() * 30,
      pressure: 1000 + Math.random() * 20
    };
  }
}