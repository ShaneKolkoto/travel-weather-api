import { Activity, Weather } from '../types';

export class ActivityService {
  rankActivities(weather: Weather): Activity[] {
    // Initialize with all required properties
    const activities: Activity[] = [
      {
        name: 'Skiing',
        score: 0,
        reason: '',
        recommended: false
      },
      {
        name: 'Surfing',
        score: 0,
        reason: '',
        recommended: false
      },
      {
        name: 'Indoor Sightseeing',
        score: 0,
        reason: '',
        recommended: false
      },
      {
        name: 'Outdoor Sightseeing',
        score: 0,
        reason: '',
        recommended: false
      }
    ];

    // Calculate scores for each activity
    activities.forEach(activity => {
      let score = 0;
      let reason = '';
      
      switch(activity.name) {
        case 'Skiing':
          score = weather.isSnowy ? 100 : weather.temperature < 0 ? 80 : 20;
          reason = weather.isSnowy ? 'Perfect snowy conditions!' : 
                   weather.temperature < 0 ? 'Cold enough for skiing' : 'Not ideal for skiing';
          break;
          
        case 'Surfing':
          score = !weather.isSnowy && weather.temperature > 18 && !weather.isRainy ? 85 : 30;
          reason = weather.isSnowy ? 'Too cold for surfing' : 
                   weather.temperature > 18 ? 'Good temperature for surfing' : 'Water might be too cold';
          break;
          
        case 'Indoor Sightseeing':
          score = weather.isRainy || weather.isSnowy || weather.temperature < 5 ? 90 : 40;
          reason = weather.isRainy ? 'Stay dry indoors!' : 
                   weather.isSnowy ? 'Stay warm indoors!' : 'Always a good option';
          break;
          
        case 'Outdoor Sightseeing':
          score = weather.isSunny && weather.temperature > 15 ? 95 : 
                  weather.isRainy ? 10 : 60;
          reason = weather.isSunny ? 'Perfect weather for exploring!' : 
                   weather.isRainy ? 'Better to stay indoors' : 'Weather conditions are okay for outdoor activities';
          break;
      }
      
      activity.score = Math.min(100, Math.max(0, score));
      activity.reason = reason;
      activity.recommended = score > 70;
    });

    return activities.sort((a, b) => b.score - a.score);
  }
}