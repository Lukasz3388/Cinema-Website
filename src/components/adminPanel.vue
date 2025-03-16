<!-- Movies.vue -->
<template>
  <div class="container my-5">
    <h2>Wybierz tabelę do edytowania</h2>
    <select v-model="selectedComponent" @change="handleSelectChange">
      <option value="movie">Filmy</option>
      <option value="seans">Seanse</option>
    </select>

    <!-- Ładowanie dynamicznego komponentu -->
    <component :is="currentView"></component>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import movie from './manageMovie.vue';
import seans from './manageSeans.vue';

const selectedComponent = ref("movie"); // Domyślnie wybrany komponent
const currentView = ref(movie);

// Mapa komponentów
const components = {
  movie,
  seans,
};

// Funkcja obsługująca zmianę wyboru
function handleSelectChange() {
  currentView.value = components[selectedComponent.value];
}
</script>
