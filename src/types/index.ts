export interface League {
  idLeague: number;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface LeagueResponse {
  leagues: League[];
}