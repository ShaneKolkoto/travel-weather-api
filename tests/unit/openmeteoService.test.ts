import axios from 'axios';
import { OpenMeteoService } from '../../src/services/openmeteoService';
import dotenv from "dotenv";

dotenv.config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OpenMeteoService', () => {
  let openMeteoService: OpenMeteoService;

  beforeEach(() => {
    openMeteoService = new OpenMeteoService();
    jest.clearAllMocks();
  });

  describe('getStationInfo', () => {
    test('should fetch station info successfully', async () => {
      const mockStationInfo = {
        id: '100',
        name: 'Lake Cospuden Lake',
        latitude: 51.2643426847,
        longitude: 12.343977716,
        sensors: [
          { type: 't', number: 0, description: 'Temperature' },
          { type: 'th', number: 0, description: 'Temperature/Humidity' }
        ]
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockStationInfo });

      const result = await openMeteoService.getStationInfo('1001');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.OPENMETEO_BASE_URL}/1001`
      );
      expect(result).toEqual(mockStationInfo);
    });

    test('should throw error when API fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(openMeteoService.getStationInfo('invalid_station'))
        .rejects.toThrow('Failed to fetch station info');
    });
  });

  describe('getTemperature', () => {
    test('should try multiple sensor types', async () => {
      // Mock failed responses for first few sensors
      mockedAxios.get
        .mockRejectedValueOnce(new Error('404')) // t0 fails
        .mockRejectedValueOnce(new Error('404')) // t1 fails
        .mockResolvedValueOnce({ // t2 succeeds
          data: [[1681234567, 22.5]]
        });

      const result = await openMeteoService.getTemperature('1001');

      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
      expect(result).toHaveProperty('value', 22.5);
      expect(result).toHaveProperty('sensorType', 't2');
    });

    test('should return mock data when all sensors fail', async () => {
      mockedAxios.get.mockRejectedValue(new Error('All sensors failed'));

      const result = await openMeteoService.getTemperature('test_station');

      expect(result).toHaveProperty('value');
      expect(result.value).toBeDefined();
      expect(typeof result.value).toBe('number');
    });
  });

  describe('getWeatherData', () => {
    test('should use real API for real stations', async () => {
      const mockSensorData = [[1681234567, 18.5, 65, 1013]];
      mockedAxios.get.mockResolvedValueOnce({ data: mockSensorData });

      const result = await openMeteoService.getWeatherData('1001');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.OPENMETEO_BASE_URL}/1001`
      );
      expect(result.temperature).toBe(18.5);
      expect(result.humidity).toBe(65);
      expect(result.pressure).toBe(1013);
    });


    test('should fall back to mock data when real API fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API down'));

      const result = await openMeteoService.getWeatherData('test_station');

      expect(result).toHaveProperty('temperature');
      expect(result).toHaveProperty('condition');
    });
  });

  describe('createWeatherFromData', () => {
    test('should determine sunny condition for high temperature', () => {
      const result = (openMeteoService as any).createWeatherFromData(30, 50, 1013);

      expect(result.condition).toBe('Sunny');
      expect(result.isSunny).toBe(true);
      expect(result.isRainy).toBe(false);
      expect(result.isSnowy).toBe(false);
    });

    test('should determine snowy condition for low temperature', () => {
      const result = (openMeteoService as any).createWeatherFromData(-5, 60, 1013);

      expect(result.condition).toBe('Snowy');
      expect(result.isSnowy).toBe(true);
    });

    test('should determine rainy condition for high humidity', () => {
      const result = (openMeteoService as any).createWeatherFromData(15, 85, 1013);

      expect(result.condition).toBe('Rainy');
      expect(result.isRainy).toBe(true);
    });
  });
});