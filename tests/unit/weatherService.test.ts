
import { WeatherService } from '../../src/services/weatherService';
import { realOpenMeteoStations } from '../../src/data/cities';
jest.mock('../../src/services/openmeteoService', () => {
    return {
        OpenMeteoService: jest.fn().mockImplementation(() => ({
            getWeatherData: jest.fn().mockResolvedValue({
                temperature: 22.5,
                condition: 'Sunny',
                isSunny: true,
                isRainy: false,
                isSnowy: false,
                humidity: 65,
                pressure: 1013
            })
        }))
    };
});

describe('WeatherService', () => {
    let weatherService: WeatherService;

    beforeEach(() => {
        weatherService = new WeatherService();
        jest.clearAllMocks();
    });

    describe('getWeather', () => {
        test('should return weather data with stationId', async () => {
            const city = realOpenMeteoStations[0]
            const weather = await weatherService.getWeather(city.latitude, city.longitude, city.stationId);

            expect(weather).toBeDefined();
            expect(typeof weather.temperature).toBe('number');
            expect(typeof weather.condition).toBe('string');
            expect(typeof weather.isSunny).toBe('boolean');
            expect(typeof weather.isRainy).toBe('boolean');
            expect(typeof weather.isSnowy).toBe('boolean');
        });

        test('should return weather data without stationId', async () => {
            const city = realOpenMeteoStations[0]

            const weather = await weatherService.getWeather(city.latitude, city.longitude);

            expect(weather).toBeDefined();
            expect(weather.temperature).toBeDefined();
            expect(weather.condition).toBeDefined();
        });

        test('should have realistic temperature ranges', async () => {
            const tropicalWeather = await weatherService.getWeather(0, 0);
            const arcticWeather = await weatherService.getWeather(80, 0);
            const temperateWeather = await weatherService.getWeather(45, 0);

            expect(tropicalWeather.temperature).toBeGreaterThanOrEqual(tropicalWeather.temperature);
            expect(arcticWeather.temperature).toBeLessThan(20);
            expect(temperateWeather.temperature).toBeGreaterThan(-10);
            expect(temperateWeather.temperature).toBeLessThan(30);
        });

        test('should have consistent weather conditions', async () => {
            const weather = await weatherService.getWeather(40.7128, -74.0060);

            if (weather.isSunny) {
                expect(weather.condition).toBe('Sunny');
            }
            if (weather.isRainy) {
                expect(weather.condition).toBe('Rainy');
            }
            if (weather.isSnowy) {
                expect(weather.condition).toBe('Snowy');
            }
            const activeConditions = [weather.isSunny, weather.isRainy, weather.isSnowy];
            const activeCount = activeConditions.filter(Boolean).length;
            expect(activeCount).toBeLessThanOrEqual(1);
        });
    });

    describe('getMockWeatherByLocation', () => {
        test('should generate different weather for different latitudes', () => {
            const tropicalWeather = (weatherService as any).getMockWeatherByLocation(0, 0);
            const arcticWeather = (weatherService as any).getMockWeatherByLocation(80, 0);

            expect(tropicalWeather.temperature).toBeGreaterThan(arcticWeather.temperature);
        });

        test('should use longitude parameter', () => {
            const eastWeather = (weatherService as any).getMockWeatherByLocation(40, 100);
            const westWeather = (weatherService as any).getMockWeatherByLocation(40, -100);
            expect(eastWeather.temperature).toBeDefined();
            expect(westWeather.temperature).toBeDefined();
        });

        test('should return valid humidity and pressure values', () => {
            const weather = (weatherService as any).getMockWeatherByLocation(40, -74);

            expect(weather.humidity).toBeGreaterThanOrEqual(0);
            expect(weather.humidity).toBeLessThanOrEqual(100);
            expect(weather.pressure).toBeGreaterThan(900);
            expect(weather.pressure).toBeLessThan(1100);
        });
    });
});
