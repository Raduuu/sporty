<template>
  <div class="filters-wrapper">
    <form novalidate @submit="onSearch">
      <input type="text" placeholder="Search league by name" v-model="searchQuery" />
      <select v-model="sportFilter">
        <option value="">All Sports</option>
        <option value="Soccer">Soccer</option>
        <option value="Basketball">Basketball</option>
        <option value="Motorsport">Motorsport</option>
      </select>
      <button type="submit">Search</button>
      <button type="reset" @click="onReset">Reset</button>
    </form>
  </div>
  <Leagues :leagues="leaguesRef" />
</template>

<script setup lang="ts">
import { fetchAllLeagues } from '@/api/leagues';
import { ref } from 'vue';
import type { League } from '@/types/index';
import Leagues from '@/components/Leagues/index.vue';

const leaguesRef = ref<League[]>([]);
const searchQuery = ref('');
const sportFilter = ref('');

const getLeagues = async () => {
  try {
    const { leagues } = await fetchAllLeagues();
    leaguesRef.value = leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};

const onSearch = (event: Event) => {
  event.preventDefault();
  const query = searchQuery.value.toLowerCase();
  const sport = sportFilter.value;

  try {
    // alternative: use computed property
    // alternative: return result based on filter api call
    const results = leaguesRef.value.filter((league) => {
      const matchesName = league.strLeague.toLowerCase().includes(query);
      const matchesSport = sport ? league.strSport === sport : true;
      return matchesName && matchesSport;
    });
    leaguesRef.value = results;
  } catch (error) {
    console.error('Error filtering leagues:', error);
  }
};

const onReset = () => {
  searchQuery.value = '';
  sportFilter.value = '';
  getLeagues();
};

getLeagues();
</script>

<style scoped>
.filters-wrapper {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

form {
  display: flex;
  gap: 1rem;
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  align-items: center;
}

input[type="text"], select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}

input[type="text"]:focus, select:focus {
  border-color: #2563eb;
}

button {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="reset"] {
  background: #f3f4f6;
  color: #374151;
}

button:hover {
  background: #1d4ed8;
}

button[type="reset"]:hover {
  background: #e5e7eb;
}
</style>
