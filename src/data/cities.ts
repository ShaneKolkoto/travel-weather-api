import { City } from '../types';

export const realOpenMeteoStations: City[] = [
  {
    id: '100',
    name: 'Lake Cospuden Lake',
    country: 'Germany',
    latitude: 51.2643426847,
    longitude: 12.343977716,
    stationId: '1001'
  },
  {
    id: '101',
    name: 'Schladitz Lake',
    country: 'Germany',
    latitude: 51.4380128519,
    longitude: 12.3431160021,
    stationId: '1002'
  },
  {
    id: '102',
    name: 'Markkleeberg Lake',
    country: 'Germany',
    latitude: 51.2556752805,
    longitude: 12.4239182434,
    stationId: '1003'
  },
  {
    id: '103',
    name: 'Leipzig - Mockau',
    country: 'Germany',
    latitude: 51.3642545525,
    longitude: 	12.4045493889,
    stationId: '1000'
  },
  {
    id: '104',
    name: 'Lake Hainer Lake',
    country: 'Germany',
    latitude: 51.1720516966,
    longitude: 12.4615430832,
    stationId: '1004'
  },
  {
    id: '105',
    name: 'Lake Störmthal',
    country: 'Germany',
    latitude: 	51.229032872,
    longitude: 	12.439956665,
    stationId: '1005'
  }
];

export const cities: City[] = [
  // North America
  {
    id: '1',
    name: 'Washington D.C.',
    country: 'USA',
    latitude: 38.9072,
    longitude: -77.0369,
    stationId: '1200'
  },
  {
    id: '2',
    name: 'Ottawa',
    country: 'Canada',
    latitude: 45.4215,
    longitude: -75.6972,
    stationId: '1201'
  },
  {
    id: '3',
    name: 'Mexico City',
    country: 'Mexico',
    latitude: 19.4326,
    longitude: -99.1332,
    stationId: '1203'
  },

  // Europe
  {
    id: '4',
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    stationId: '1204'
  },
  {
    id: '5',
    name: 'Paris',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
    stationId: '1205'
  },
  {
    id: '6',
    name: 'Berlin',
    country: 'Germany',
    latitude: 52.5200,
    longitude: 13.4050,
    stationId: '1206'
  },
  {
    id: '7',
    name: 'Rome',
    country: 'Italy',
    latitude: 41.9028,
    longitude: 12.4964,
    stationId: '1207'
  },
  {
    id: '8',
    name: 'Madrid',
    country: 'Spain',
    latitude: 40.4168,
    longitude: -3.7038,
    stationId: '1208'
  },
  {
    id: '9',
    name: 'Moscow',
    country: 'Russia',
    latitude: 55.7558,
    longitude: 37.6173,
    stationId: '1209'
  },

  // Asia
  {
    id: '10',
    name: 'Tokyo',
    country: 'Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    stationId: '1210'
  },
  {
    id: '11',
    name: 'Beijing',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    stationId: '1211'
  },
  {
    id: '12',
    name: 'New Delhi',
    country: 'India',
    latitude: 28.6139,
    longitude: 77.2090,
    stationId: '1212'
  },
  {
    id: '13',
    name: 'Seoul',
    country: 'South Korea',
    latitude: 37.5665,
    longitude: 126.9780,
    stationId: '1213'
  },
  {
    id: '14',
    name: 'Bangkok',
    country: 'Thailand',
    latitude: 13.7563,
    longitude: 100.5018,
    stationId: '1214'
  },
  {
    id: '15',
    name: 'Singapore',
    country: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    stationId: '1215'
  },

  // Oceania
  {
    id: '16',
    name: 'Canberra',
    country: 'Australia',
    latitude: -35.2809,
    longitude: 149.1300,
    stationId: '1216'
  },
  {
    id: '17',
    name: 'Wellington',
    country: 'New Zealand',
    latitude: -41.2865,
    longitude: 174.7762,
    stationId: '1217'
  },

  // Africa
  {
    id: '18',
    name: 'Cairo',
    country: 'Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    stationId: '1218'
  },
  {
    id: '19',
    name: 'Nairobi',
    country: 'Kenya',
    latitude: -1.2921,
    longitude: 36.8219,
    stationId: '1219'
  },
  {
    id: '20',
    name: 'Pretoria',
    country: 'South Africa',
    latitude: -25.7479,
    longitude: 28.2293,
    stationId: '1220'
  },
  {
    id: '21',
    name: 'Rabat',
    country: 'Morocco',
    latitude: 34.0209,
    longitude: -6.8416,
    stationId: '1221'
  },

  // South America
  {
    id: '22',
    name: 'Brasília',
    country: 'Brazil',
    latitude: -15.7975,
    longitude: -47.8919,
    stationId: '1222'
  },
  {
    id: '23',
    name: 'Buenos Aires',
    country: 'Argentina',
    latitude: -34.6037,
    longitude: -58.3816,
    stationId: '1223'
  },
  {
    id: '24',
    name: 'Lima',
    country: 'Peru',
    latitude: -12.0464,
    longitude: -77.0428,
    stationId: '1224'
  },
  {
    id: '25',
    name: 'Santiago',
    country: 'Chile',
    latitude: -33.4489,
    longitude: -70.6693,
    stationId: '1225'
  }
];

// Combine both datasets fake_data and real_data
export const allCities: City[] = [...cities, ...realOpenMeteoStations];


// This needs to be replaced with real data for now will be using mock data
export function getRealStations(): City[] {
  return realOpenMeteoStations;
}

// Helper function to search all cities
export function searchAllCities(searchTerm: string): City[] {
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) return [];
  
  return allCities.filter(city =>
    city.name.toLowerCase().includes(term) ||
    city.country.toLowerCase().includes(term)
  ).slice(0, 10);
}
