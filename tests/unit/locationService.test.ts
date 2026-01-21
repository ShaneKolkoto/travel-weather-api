import { LocationService } from '../../src/services/locationService';
import { cities, realOpenMeteoStations } from '../../src/data/cities';

describe('LocationService', () => {
  let locationService: LocationService;

  beforeEach(() => {
    locationService = new LocationService();
  });

  describe('suggestCities', () => {
    test('should return empty array for empty input', () => {
      const result = locationService.suggestCities('');
      expect(result).toEqual([]);
    });

    test('should return matching cities by name', () => {
      const result = locationService.suggestCities('lond');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name).toBe('London');
    });

    test('should return matching cities by country', () => {
      const result = locationService.suggestCities('germany');
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].country).toContain('Germany');
    });

    test('should return case-insensitive matches', () => {
      const result1 = locationService.suggestCities('LONDON');
      const result2 = locationService.suggestCities('london');
      expect(result1[0].name).toBe(result2[0].name);
    });

    test('should return limited results (max 10)', () => {
      // Create a search that would match many cities
      const result = locationService.suggestCities('a');
      expect(result.length).toBeLessThanOrEqual(10);
    });
  });

  describe('findCityById', () => {
    test('should find city by valid ID', () => {
      const city = locationService.findCityById('1200');
      expect(city).toBeDefined();
      expect(city?.name).toBe('Washington D.C.');
    });

    test('should return undefined for invalid ID', () => {
      const city = locationService.findCityById('Washington D.C.');
      expect(city).toBeUndefined();
    });
  });

  describe('isRealOpenMeteoStation', () => {
    test('should identify real OpenMeteo stations', () => {
      const realStation = realOpenMeteoStations[0];
      expect(locationService.isRealOpenMeteoStation(realStation.stationId!)).toBe(true);
    });

    test('should identify fictional stations', () => {
      const fictionalStation = cities[0];
      expect(locationService.isRealOpenMeteoStation(fictionalStation.stationId!)).toBe(false);
    });
  });

  describe('getAllCities', () => {
    test('should return all cities including real stations', () => {
      const allCities = locationService.getAllCities();
      expect(allCities.length).toBe(cities.length + realOpenMeteoStations.length);
    });
  });
});