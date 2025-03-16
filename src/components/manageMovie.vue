<template>
  <div class="container my-5">
    <button class="btn btn-primary" @click="handleAddNewMovie">Dodaj nowy film</button>

    <!-- Formularz do dodawania/edycji filmu -->
    <div v-if="showForm" class="my-4">
      <h3>{{ isEditing ? 'Edytuj film' : 'Dodaj nowy film' }}</h3>
      <form @submit.prevent="isEditing ? updateMovieHandler() : addMovieHandler()">
        <div class="mb-3">
          <label for="title" class="form-label">Tytuł</label>
          <input type="text" v-model="currentMovie.title" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="director" class="form-label">Reżyser</label>
          <input type="text" v-model="currentMovie.director" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="genre" class="form-label">Gatunek</label>
          <input type="text" v-model="currentMovie.genre" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="rating" class="form-label">Ocena</label>
          <input type="number" v-model="currentMovie.rating" class="form-control" min="0" max="10" step="0.1" required />
        </div>

        <div class="mb-3">
          <label for="year" class="form-label">Rok wydania</label>
          <input type="number" v-model="currentMovie.year" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Link do zdjęcia</label>
          <input type="text" v-model="currentMovie.image" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-success">{{ isEditing ? 'Zaktualizuj film' : 'Dodaj film' }}</button>
        <button type="button" class="btn btn-secondary" @click="toggleForm">Anuluj</button>
      </form>
    </div>

    <h2>Filmy</h2>
    <p>Sprawdź filmy jakie możesz u nas zobaczyć</p>

    <div class="row">
      <div class="col-12 col-md-4 mb-3" v-for="movie in movies" :key="movie.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <button class="btn btn-primary" @click="handleEdit(movie)">Edytuj</button>
            <button class="btn btn-danger" @click="handleDelete(movie.id)">Usuń</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading">Ładowanie...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMovies } from "@/composables/useMovies";

// Pobieranie funkcji z composable `useMovies`
const { movies, loading, error, deleteMovie, addMovie, updateMovie } = useMovies();

const showForm = ref(false);
const isEditing = ref(false);
const currentMovie = ref({
  id: null,
  title: "",
  director: "",
  genre: "",
  rating: 0,
  year: 0,
  image: ""
});

// Funkcja przełączająca widoczność formularza
const toggleForm = () => {
  showForm.value = !showForm.value;
};

// Funkcja obsługująca dodawanie nowego filmu
const handleAddNewMovie = () => {
  isEditing.value = false;
  resetForm();
  toggleForm();
};

// Funkcja obsługująca edycję filmu
const handleEdit = (movie) => {
  isEditing.value = true;
  currentMovie.value = { ...movie };
  toggleForm();
};

// Funkcja obsługująca usuwanie filmu
const handleDelete = (id) => {
  console.log(id);
  if (confirm("Czy na pewno chcesz usunąć ten film?")) {
    deleteMovie(id);
  }
};

// Funkcja do dodawania nowego filmu
const addMovieHandler = () => {
  addMovie(currentMovie.value);
  resetForm();
  toggleForm();
};

// Funkcja do aktualizowania filmu
const updateMovieHandler = () => {
  updateMovie(currentMovie.value);
  resetForm();
  toggleForm();
};

// Funkcja resetująca formularz
const resetForm = () => {
  currentMovie.value = {
    id: null,
    title: "",
    director: "",
    genre: "",
    rating: 0,
    year: 0,
    image: ""
  };
};
</script>
