import { ActivityService } from '../../src/services/activityService';
import { Weather } from '../../src/types';

describe('ActivityService', () => {
  let activityService: ActivityService;

  beforeEach(() => {
    activityService = new ActivityService();
  });

  describe('rankActivities', () => {
    test('should return all 4 activities', () => {
      const sunnyWeather: Weather = {
        temperature: 25,
        condition: 'Sunny',
        isSunny: true,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(sunnyWeather);
      expect(activities).toHaveLength(4);
      // expect(activities.map(a => a.name)).toEqual([
      //   'Outdoor Sightseeing',
      //   'Surfing',
      //   'Indoor Sightseeing',
      //   'Skiing'
      // ].sort());
    });

    test('should prioritize skiing in snowy conditions', () => {
      const snowyWeather: Weather = {
        temperature: -5,
        condition: 'Snowy',
        isSunny: false,
        isRainy: false,
        isSnowy: true
      };
      
      const activities = activityService.rankActivities(snowyWeather);
      const skiing = activities.find(a => a.name === 'Skiing');
      
      expect(skiing?.score).toBe(100);
      expect(skiing?.recommended).toBe(true);
      expect(activities[0].name).toBe('Skiing'); // Should be top ranked
    });

    test('should prioritize surfing in warm sunny conditions', () => {
      const perfectSurfWeather: Weather = {
        temperature: 28,
        condition: 'Sunny',
        isSunny: true,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(perfectSurfWeather);
      const surfing = activities.find(a => a.name === 'Surfing');
      
      expect(surfing?.score).toBe(85);
      expect(surfing?.recommended).toBe(true);
    });

    test('should prioritize indoor activities in rainy conditions', () => {
      const rainyWeather: Weather = {
        temperature: 12,
        condition: 'Rainy',
        isSunny: false,
        isRainy: true,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(rainyWeather);
      const indoorSightseeing = activities.find(a => a.name === 'Indoor Sightseeing');
      
      expect(indoorSightseeing?.score).toBe(90);
      expect(indoorSightseeing?.recommended).toBe(true);
      expect(activities[0].name).toBe('Indoor Sightseeing');
    });

    test('should score activities between 0 and 100', () => {
      const testWeather: Weather = {
        temperature: 15,
        condition: 'Cloudy',
        isSunny: false,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(testWeather);
      
      activities.forEach(activity => {
        expect(activity.score).toBeGreaterThanOrEqual(0);
        expect(activity.score).toBeLessThanOrEqual(100);
      });
    });

    test('should provide reasons for scores', () => {
      const testWeather: Weather = {
        temperature: 20,
        condition: 'Sunny',
        isSunny: true,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(testWeather);
      
      activities.forEach(activity => {
        expect(activity.reason).toBeDefined();
        expect(typeof activity.reason).toBe('string');
        expect(activity.reason.length).toBeGreaterThan(0);
      });
    });

    test('should sort activities by score descending', () => {
      const testWeather: Weather = {
        temperature: 10,
        condition: 'Cloudy',
        isSunny: false,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(testWeather);
      
      for (let i = 0; i < activities.length - 1; i++) {
        expect(activities[i].score).toBeGreaterThanOrEqual(activities[i + 1].score);
      }
    });
  });

  describe('extreme weather conditions', () => {
    test('very cold weather should favor skiing', () => {
      const freezingWeather: Weather = {
        temperature: -10,
        condition: 'Snowy',
        isSunny: false,
        isRainy: false,
        isSnowy: true
      };
      
      const activities = activityService.rankActivities(freezingWeather);
      const skiing = activities.find(a => a.name === 'Skiing');
      const surfing = activities.find(a => a.name === 'Surfing');
      
      expect(skiing?.score).toBe(100);
      expect(surfing?.score).toBe(30); // Too cold for surfing
    });

    test('hot weather should favor outdoor activities', () => {
      const hotWeather: Weather = {
        temperature: 35,
        condition: 'Sunny',
        isSunny: true,
        isRainy: false,
        isSnowy: false
      };
      
      const activities = activityService.rankActivities(hotWeather);
      const outdoorSightseeing = activities.find(a => a.name === 'Outdoor Sightseeing');
      
      expect(outdoorSightseeing?.score).toBe(95);
      expect(outdoorSightseeing?.recommended).toBe(true);
    });
  });
});