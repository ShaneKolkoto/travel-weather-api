export interface Weather {
  temperature: number;
  condition: string;
  isSunny: boolean;
  isRainy: boolean;
  isSnowy: boolean;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
}

export interface Activity {
  name: string;
  score: number;
  reason: string;
  recommended: boolean;
}