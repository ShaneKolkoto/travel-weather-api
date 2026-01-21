import { allCities, searchAllCities, getRealStations } from '../data/cities';
import { City } from '../types';

export class LocationService {
    suggestCities(input: string): City[] {
        return searchAllCities(input);
    }

    findCityById(cityId: string): (City & { real_station: boolean }) | undefined {
        const realStations = getRealStations();

        // Find the city in allCities
        const city = allCities.find(city => city.stationId === cityId);

        if (!city) {
            return undefined;
        }

        // Check if this city's stationId exists in real stations
        const isRealStation = city.stationId
            ? realStations.some(realStation => realStation.stationId === city.stationId)
            : false;

        // Return the city with the real_station flag
        return {
            ...city,
            real_station: isRealStation
        };
    }

    findCityByStationId(stationId: string): City | undefined {
        return allCities.find(city => city.stationId === stationId);
    }

    // Get all cities including real stations
    getAllCities(): City[] {
        return allCities;
    }

    // Check if a station is real or fictional
    isRealOpenMeteoStation(stationId: string): boolean {
        const realStations = [
            '1000', '1001', '1002',
            '1003', '1004'
        ];
        return realStations.includes(stationId);
    }
}