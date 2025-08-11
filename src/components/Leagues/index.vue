<template>
  <table>
    <thead>
      <tr>
        <th>League</th>
        <th>Sport</th>
        <th>League Alternate</th>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="league in leagues" 
      :key="league.idLeague" 
      @click="onLeagueClick(league.idLeague)"
      style="cursor:pointer"
      >
      <td>
        {{ league.strLeague }}
        <div v-if="selectedLeagueId === league.idLeague && selectedBadgeUrl">
          <img :src="selectedBadgeUrl" alt="League Badge" style="height:200px; margin-top:8px;" />
        </div>
      </td>
      <td>{{ league.strSport }}</td>
      <td>{{ league.strLeagueAlternate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { League } from '@/types/index';
import { fetchBadge } from '@/api/badges';

const selectedLeagueId = ref<number | null>(null);
const selectedBadgeUrl = ref('');
const badgeCache = new Map<number, string>();

const { leagues } = defineProps<{
  leagues: League[];  
}>();

const onLeagueClick = async (id: number) => {
  try {
    if (badgeCache.has(id)) {
      selectedLeagueId.value = id;
      selectedBadgeUrl.value = badgeCache.get(id) || '';
      return;
    }

    const { seasons } = await fetchBadge(id);
    const badgeUrl = seasons[seasons.length - 1].strBadge;
    badgeCache.set(id, badgeUrl);

    selectedLeagueId.value = id;
    selectedBadgeUrl.value = badgeUrl;
  } catch (error) {
    console.error(`Error fetching badge for league ${id}:`, error);
  }
};
</script>

<style scoped>
table {
  width: 90%;
  margin: 2rem auto 0 auto;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
}

thead {
  background: #f3f4f6;
}

th {
  font-weight: 600;
  color: #2563eb;
  border-bottom: 2px solid #e5e7eb;
}

tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.15s;
}

tbody tr:hover {
  background: #f1f5f9;
}

</style>