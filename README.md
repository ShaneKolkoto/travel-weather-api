# Travel-Weather-Api

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

> A GraphQL API for a travel planning application that provides **city suggestions**, **weather data**, and **weather-based activity recommendations**. <br>
> This project was built as part of a Mid-Level Backend Engineer technical assessment, with a focus on clean architecture, schema design, and testable business logic.

## ✨ Features

- 🔍 Dynamic city suggestions based on partial or full user input
- ☀️ Weather forecasts for a selected city (via Open-Meteo)
- 🏂 Activity ranking based on current weather conditions:
  - Skiing
  - Surfing
  - Indoor sightseeing
  - Outdoor sightseeing
- 🧪 Unit-tested core business logic

### Key Design Decisions:

1. **GraphQL Schema Design**: Designed for extensibility with clear types and relationships
2. **Separation of Concerns**: Services handle business logic, resolvers handle GraphQL concerns
3. **Caching Strategy**: Multi-level caching with appropriate TTLs for different data types
4. **Validation**: validation for all inputs with clear error messages

<!-- ## Setup -->

## Setup

1. Clone the repository:

```bash
git clone https://github.com/ShaneKolkoto/travel-weather-api
cd travel-weather-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run locally

```bash
    npm run dev
```

## Queries

1.  ### City Suggestions
    > Search for cities with auto-complete functionality:

```gql
query {
  suggestCities(input: "New York") {
    id
    name
    country
    latitude
    longitude
    stationId
  }
}
```

2.  ### Get Weather
    > Retrieve current weather for a specific city:

```gql
query {
  getWeather(cityId: "city_123") {
    temperature
    condition
    isSunny
    isRainy
    isSnowy
  }
}
```

3.  ### Get Activities
    > Retrieve current weather for a specific city:

```gql
query {
  getActivities(cityId: "city_123") {
    name
    score
    reason
    recommended
  }
}
```

4.  ### Travel Recommendation
    > Get a comprehensive travel package:

```gql
query {
  travelRecommendation(cityId: "city_123") {
    city {
      id
      name
      country
    }
    weather {
      temperature
      condition
      isSunny
    }
    activities {
      name
      score
      recommended
      reason
    }
  }
}
```