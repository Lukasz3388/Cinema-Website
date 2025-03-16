import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFiltersStore = defineStore('filters', () => {
  // Zmienna: stan filtrów
  const filters = ref({
    genre: '',
    minRating: null,
    year: null,
  });

  // Getter: pobieranie aktywnych filtrów
  const activeFilters = computed(() => filters.value);

  // Akcja: ustawianie filtrów
  const setFilters = (newFilters) => {
    filters.value = { ...newFilters };
  };

  // Akcja: resetowanie filtrów
  const resetFilters = () => {
    filters.value = {
      genre: '',
      minRating: null,
      year: null,
    };
  };

  return {
    filters,
    activeFilters,
    setFilters,
    resetFilters,
  };
});
