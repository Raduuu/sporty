import type { LeagueResponse } from "@/types";
import axios from "axios";

const SPORTSDB_API_URL = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';

export async function fetchAllLeagues(): Promise<LeagueResponse> {
  try {
    const response = await axios.get(SPORTSDB_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch leagues');
  }
}

export default {
  fetchAllLeagues
}