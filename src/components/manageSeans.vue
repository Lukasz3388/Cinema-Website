<template>
  <div class="container my-5">
    <!-- Przycisk do wyświetlania formularza -->
    <button class="btn btn-primary" @click="handleAddNewSeans">Dodaj nowy seans</button>

    <!-- Formularz do dodawania/edycji seansu -->
    <div v-if="showForm" class="my-4">
      <h3>{{ isEditing ? 'Edytuj seans' : 'Dodaj nowy seans' }}</h3>
      <form @submit.prevent="isEditing ? updateSeansHandler() : addSeansHandler()">
        <div class="mb-3">
          <label for="movieName" class="form-label">Wybierz film</label>
          <select v-model="currentSeans.movieName" id="movieName" class="form-select" required>
            <option v-for="movie in movies" :key="movie.id" :value="movie.title">{{ movie.title }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="date" class="form-label">Data</label>
          <input type="date" v-model="currentSeans.date" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="hall" class="form-label">Sala</label>
          <input type="text" v-model="currentSeans.hall" class="form-control" placeholder="np. Sala 1" required />
        </div>

        <div class="mb-3">
          <label for="language" class="form-label">Język</label>
          <input type="text" v-model="currentSeans.language" class="form-control" placeholder="np. Angielski" required />
        </div>

        <div class="mb-3">
          <label for="subtitles" class="form-label">Napisy</label>
          <select v-model="currentSeans.subtitles" class="form-select" required>
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="time" class="form-label">Godzina</label>
          <input type="time" v-model="currentSeans.time" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-success">{{ isEditing ? 'Zaktualizuj seans' : 'Dodaj seans' }}</button>
        <button type="button" class="btn btn-secondary" @click="toggleForm">Anuluj</button>
      </form>
    </div>

    <h2>Seanse Filmowe</h2>
    <div class="row">
      <div class="col-12 col-md-4 mb-3" v-for="seans in seanse" :key="seans.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ seans.movieName }}</h5>
            Data:
            <p class="card-text">{{ seans.date }}</p>
            Godzina:
            <p class="card-text">{{ seans.time }}</p>
            <button class="btn btn-primary" @click="handleEdit(seans)">Edytuj</button>
            <button class="btn btn-danger" @click="handleDelete(seans.id)">Usuń</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading">Ładowanie...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSeanse } from "@/composables/useSeanse";
import { useMovies } from "@/composables/useMovies";

// Pobieramy dane i funkcje z composable `useSeanse` oraz `useMovies`
const { seanse, loading, error, deleteSeans, addSeans, updateSeans } = useSeanse();
const { movies } = useMovies();

const showForm = ref(false);
const isEditing = ref(false);
const currentSeans = ref({
  id: null,
  movieName: "",
  date: "",
  hall: "",
  language: "",
  subtitles: "false",
  time: ""
});

// Przełączanie widoczności formularza
const toggleForm = () => {
  showForm.value = !showForm.value;
};

// Funkcja obsługująca dodawanie nowego seansu
const handleAddNewSeans = () => {
  isEditing.value = false;
  resetForm();
  toggleForm();
};

// Funkcja obsługująca edycję seansu
const handleEdit = (seans) => {
  isEditing.value = true;
  currentSeans.value = { ...seans };
  toggleForm();
};

// Funkcja obsługująca usuwanie seansu
const handleDelete = (id) => {
  if (confirm("Czy na pewno chcesz usunąć ten seans?")) {
    deleteSeans(id);
  }
};

// Funkcja do dodawania nowego seansu
const addSeansHandler = () => {
  addSeans(currentSeans.value);
  resetForm();
  toggleForm();
};

// Funkcja do aktualizowania seansu
const updateSeansHandler = () => {
  updateSeans(currentSeans.value);
  resetForm();
  toggleForm();
};

// Funkcja resetująca formularz
const resetForm = () => {
  currentSeans.value = {
    id: null,
    movieName: "",
    date: "",
    hall: "",
    language: "",
    subtitles: "false",
    time: ""
  };
};

onMounted(() => {
  if (!movies.value.length) {
    movies.value = [];
  }
});
</script>
