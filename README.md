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

> A GraphQL API for retrieving travel recommendations based on weather conditions and activities. The API provides city search functionality, weather data, activity recommendations, and comprehensive travel packages.

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

# About my Journey

**Day 1 - The Research Deep Dive**
> My journey began not with writing code, but with solving a mystery. The challenge presented an API link that immediately raised questions—it looked outdated, documentation seemed sparse, and my initial attempts to access weather data for global cities returned nothing. I spent the majority of Day 1 in what felt like digital archaeology, digging through search results, testing endpoints, and piecing together how this weather API actually worked. <br><br>
What I discovered was revealing: this wasn't the global weather API I initially assumed. The provided OpenMeteo service was actually a local German weather network with only 7 stations around Leipzig. This explained why my tests with cities like Tokyo or New York failed—those stations simply didn't exist in their system. This research phase was crucial because it forced a strategic pivot. Instead of building around a non-existent global API, I needed to design an architecture that could gracefully handle this limitation while still delivering a functional travel planning system. <br><br>
The key insight from this research was understanding that architecture must adapt to reality, not ideal assumptions. I spent hours reading API documentation, testing endpoints, and validating what was actually possible versus what was theoretically possible. This groundwork informed every technical decision that followed.

**Day 2 - Building the Foundation with Confidence**
> Armed with my research findings from Day 1, I approached Day 2 with clarity and purpose. Now understanding the actual constraints (limited real weather stations, need for mock data, geographic restrictions), I could design a system that worked with reality rather than against it.

**Day 3 - Bringing It All Together**
> Creating the GraphQL type definitions felt straightforward because I already understood exactly what data shapes we had to work with. The resolvers came together cleanly because they were essentially orchestrators for services that were already designed to work together. Each query—from simple city searches to complete travel recommendations—flowed naturally from the architecture. <br><br>
The "pull request" mindset of Day 3 wasn't just about merging code—it was about creating a cohesive whole from carefully constructed parts. I tested each GraphQL query against both real stations (where we might get actual weather data) and fictional ones (where we'd use smart mock data), verifying that the system behaved correctly in both cases. <br><br>
What made this three-day journey particularly meaningful was the narrative arc: from uncertainty and research, through foundation-building based on discovered constraints, to finally creating a polished, functional API. The final system wasn't what I initially imagined when reading the challenge, but it was something better—a robust solution that honestly addressed real-world constraints while delivering on the core requirements. The journey transformed from "how do I make this ideal system?" to "how do I make an excellent system within these interesting constraints?"—and that made all the difference.

## Architecture Diagram

- **Service-Oriented Design**: Separate services for location, weather, and activity logic.
- **Smart Mock Data Strategy**: Implement realistic mock weather data based on geographic coordinates rather than random generation.
- **Real vs Fictional Station Detection**: Automatic detection and flagging of real OpenMeteo stations vs fictional ones.
- **GraphQL Schema Design**: Rich, self-documenting schema with descriptive types and queries.
  -- **Error Handling Strategy**: Graceful degradation with descriptive errors.

## Visualization Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    GraphQL API Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │   Server    │  │  TypeDefs   │  │    Resolvers       │  │
│  │ (Apollo)    │◄─┤ (Schema)    │◄─┤ (Query Logic)      │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Service Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │  Location   │  │   Weather   │  │    Activity        │  │
│  │   Service   │  │   Service   │  │    Service         │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Data Layer                               │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │  City Data  │  │  Type Defs  │  │ External APIs      │  │
│  │ (Static)    │  │ (TypeScript)│  │ (OpenMeteo)        │  │
│  └─────────────┘  └─────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Omissions & Trade-offs

> What Was Skipped and Why?

1. **Database Integration**: No persistent database layer. Project scope focused on API architecture and GraphQL implementation
2. **Authentication & Authorization**: No user authentication, authorization, or rate limiting. Project requirements didn't specify user management
3. **Production-Ready Error Handling**: Basic error handling without structured logging or monitoring. GraphQL errors provide basic client feedback
4. **Caching Layer**: No Redis or other caching mechanism. Weather data is prime candidate for caching, but adds infrastructure complexity

## How you would improve or extend the project with more time.

> Given additional development time, the Travel Planning GraphQL API can evolve from a demonstration project into a comprehensive, production-ready travel platform. This roadmap outlines a phased approach to enhancements, balancing feature richness with technical robustness.

1. **Database Integration**

   > Replace the current in-memory city data with a persistent database solution.

2. **Authentication & Authorization**

   > Implement a secure authentication system using JSON Web Tokens (JWT) and OAuth 2.0. This would enable user accounts, saved trips, personalized recommendations, and role-based access control. The system would include secure password storage, email verification, and refresh token rotation.

3. **Real Global Weather Data**
   > Integrate with reliable global weather APIs such as [OpenWeatherMap](#https://openweathermap.org/) or [WeatherAPI.com](https://www.weatherapi.com/) to replace mock data for most cities.


## AI Tools Used in This Project
> Throughout this project, I used AI tools—specifically DeepSeek—as a productivity accelerator and thought partner, not as a crutch. My approach was guided by a simple principle: use AI to handle tedious, well-defined tasks so I could focus my human intelligence on architecture, problem-solving, and creative decisions.

**Why This Made Sense:**
- Creating a list of 25+ capital cities with accurate latitude/longitude coordinates is a tedious, error-prone task

- The data itself isn't the innovation—it's foundation material

- AI could produce this in minutes versus hours of manual research and data entry

- Freed me to focus on how the data would be used rather than just compiled