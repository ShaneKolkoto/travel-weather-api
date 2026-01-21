import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../../src/schema/typeDefs';
import { resolvers } from '../../src/schema/resolvers';

describe('GraphQL API Integration', () => {
  let server: ApolloServer;
  let url: string;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url: serverUrl } = await startStandaloneServer(server, {
      listen: { port: 0 },
    });
    
    url = serverUrl;
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('suggestCities query', () => {
    test('should return city suggestions', async () => {
      const query = `
        query {
          suggestCities(input: "lon") {
            id
            name
            country
          }
        }
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const result: any = await response.json();
      
      expect(response.status).toBe(200);
      expect(result.data.suggestCities).toBeDefined();
      expect(Array.isArray(result.data.suggestCities)).toBe(true);
    });
  });

  describe('travelRecommendation query', () => {
    test('should return complete travel data', async () => {
      const query = `
        query {
          travelRecommendation\(cityId: "1001") {
            city {
              name
              country
            }
            weather {
              temperature
              condition
              isSunny
              isRainy
              isSnowy
            }
            activities {
              name
              score
              recommended
              reason
            }
          }
        }
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const result: any = await response.json();
      
      expect(response.status).toBe(200);
      expect(result.data.travelRecommendation).toBeDefined();
      expect(result.data.travelRecommendation.city).toBeDefined();
      expect(result.data.travelRecommendation.weather).toBeDefined();
      expect(result.data.travelRecommendation.activities).toBeDefined();
    });

    test('should return error for invalid city', async () => {
      const query = `
        query {
          travelRecommendation\(cityId: "999") {
            city {
              name
            }
          }
        }
      `;

      const response: any = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      
      expect(result.errors).toBeDefined();
      expect(result.errors[0].message).toContain('City not found');
    });
  });
});