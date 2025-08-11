import axios from 'axios';

const BADGE_API_URL = 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php';

export async function fetchBadge(id: number): Promise<any> {
  try {
    const response = await axios.get(BADGE_API_URL, {
      params: {
        id,
        badge: 1
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch leagues');
  }
}

export default {
  fetchBadge
}