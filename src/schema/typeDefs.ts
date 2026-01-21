import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type City {
    id: ID!
    name: String!
    country: String!
    latitude: Float!
    longitude: Float!
    stationId: String!
  }

  type Weather {
    temperature: Float!
    condition: String!
    isSunny: Boolean!
    isRainy: Boolean!
    isSnowy: Boolean!
  }

  type Activity {
    name: String!
    score: Int!
    reason: String!
    recommended: Boolean!
  }

  type Query {
    suggestCities(input: String!): [City!]!
    getWeather(cityId: ID!): Weather!
    getActivities(cityId: String!): [Activity!]!
    travelRecommendation(cityId: String!): TravelRecommendation!
  }

  type TravelRecommendation {
    city: City!
    weather: Weather!
    activities: [Activity!]!
  }
`;