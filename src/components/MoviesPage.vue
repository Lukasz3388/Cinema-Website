<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Filmy</h2>
    <p class="text-center">Sprawdź filmy jakie możesz u nas zobaczyć</p>
    
    <!-- Sekcja filtrów -->
    <div class="card p-3 mb-4 shadow-sm">
      <h5 class="card-title">Filtry</h5>
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <label for="genre" class="form-label">Gatunek</label>
          <select id="genre" v-model="selectedFilters.genre" class="form-select">
            <option value="">Wszystkie</option>
            <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="minRating" class="form-label">Minimalna ocena</label>
          <input
            type="number"
            id="minRating"
            v-model.number="selectedFilters.minRating"
            min="0"
            max="10"
            class="form-control"
            placeholder="Od 0 do 10"
          />
        </div>
        <div class="col-md-4">
          <label for="year" class="form-label">Rok premiery</label>
          <input
            type="number"
            id="year"
            v-model.number="selectedFilters.year"
            min="1900"
            max="2099"
            class="form-control"
            placeholder="Np. 2023"
          />
        </div>
        <div class="col-12 text-center mt-3">
          <button class="btn btn-primary me-2" @click="applyFilters">
            Zatwierdź filtry
          </button>
          <button class="btn btn-outline-secondary" @click="clearFilters">
            Wyczyść filtry
          </button>
        </div>
      </div>
    </div>

    <!-- Obsługa błędów -->
    <div v-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
    </div>

    <!-- Obsługa ładowania -->
    <div v-if="loading" class="text-center">
      <p>Ładowanie filmów...</p>
    </div>

    <!-- Lista filmów -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="movie in filteredMovies" :key="movie.id">
        <div class="card shadow-sm border-light h-100">
          <img :src="movie.image" class="card-img-top" alt="Filmy" />
          <div class="card-body">
            <h5 class="card-title bg-success text-white p-2 text-center rounded">
              {{ movie.title }}
            </h5>
            <p class="card-text"><strong>Gatunek:</strong> {{ movie.genre }}</p>
            <p class="card-text"><strong>Reżyser:</strong> {{ movie.director }}</p>
            <p class="card-text"><strong>Oceny:</strong> {{ movie.rating }}</p>
            <p class="card-text"><strong>Rok premiery:</strong> {{ movie.year }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Informacja o braku wyników -->
    <div v-if="filteredMovies.length === 0 && !loading" class="text-center mt-5">
      <p class="text-muted">Brak wyników dla wybranych filtrów.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, toRaw } from 'vue';
import { useMovies } from '@/composables/useMovies';
import { useFiltersStore } from '@/stores/moviesFilter';

// Pobieranie danych o filmach
const { movies, loading, error } = useMovies();

// Pobieranie Pinia Store
const filtersStore = useFiltersStore();
const { activeFilters, setFilters, resetFilters } = filtersStore;

// Dynamiczne pobieranie unikalnych gatunków
const genres = ref([]);
watch(
  () => movies.value,
  (newMovies) => {
    const uniqueGenres = [...new Set(newMovies.map((movie) => movie.genre))];
    genres.value = uniqueGenres;
  },
  { immediate: true }
);

// Lokalny stan do formularza
const selectedFilters = ref(toRaw(activeFilters));
//console.log(activeFilters);

// Filtrowanie filmów
const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    return (
      (selectedFilters.value.genre ? movie.genre === selectedFilters.value.genre : true) &&
      (selectedFilters.value.minRating ? movie.rating >= selectedFilters.value.minRating : true) &&
      (selectedFilters.value.year ? movie.year === parseInt(selectedFilters.value.year) : true)
    );
  });
});

// Obsługa zatwierdzania filtrów
const applyFilters = () => {
  setFilters(selectedFilters.value); // Zapisujemy filtry do store'a
};

// Reset filtrów
const clearFilters = () => {
  resetFilters(); // Resetujemy filtry w Pinia Store
  selectedFilters.value = { ...activeFilters }; // Resetujemy lokalny stan po resecie
};

// Synchronizacja przy ładowaniu komponentu
onMounted(() => {
  selectedFilters.value = { ...activeFilters };
});
</script>


<style scoped>
img {
  height: auto;
  max-height: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.card-title {
  font-size: 1.25rem;
}
</style>
