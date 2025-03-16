<template>
  <div class="container my-5">
    <!-- Nagłówek powitalny -->
    <div class="jumbotron text-center p-5 rounded">
      <h1 class="display-4">Witaj w świecie Kina!</h1>
      <p class="lead">Odkryj najlepsze filmy, sprawdź najbliższe seanse i wiele innych rzeczy, które przygotowaliśmy specjalnie dla Ciebie!</p>
      <hr class="my-4">
      <p>Kliknij na jedną z poniższych opcji, aby zacząć przeglądanie:</p>
    </div>

    <!-- Sekcja z opcjami - filmy i seanse -->
    <div class="row justify-content-center">
      <div class="col-md-5 mb-4">
        <div class="card shadow-lg border-light rounded">
          <img src="https://as1.ftcdn.net/jpg/01/47/44/02/1000_F_147440222_BBPZgsQw5ZlxlObCNYnkPCYuZzvaIn5K.jpg" class="card-img-top" alt="Filmy">
          <div class="card-body">
            <h5 class="card-title">Sprawdź nasze filmy</h5>
            <p class="card-text">Znajdź najnowsze produkcje, klasyki kina i wiele innych filmów. Kliknij tutaj, aby zobaczyć pełną listę.</p>
            <button class="btn btn-primary" @click="showMovies">Zobacz Filmy</button>
          </div>
        </div>
      </div>

      <div class="col-md-5 mb-4">
        <div class="card shadow-lg border-light rounded">
          <img src="https://media.istockphoto.com/id/1494642262/pl/zdj%C4%99cie/ludzie-w-sali-kinowej-z-pustym-bia%C5%82ym-ekranem.jpg?s=612x612&w=0&k=20&c=sGFE7YKc3bDFnXmNp410YFDtPGbLvBeN6kMe6FA3vOM=" class="card-img-top" alt="Seanse">
          <div class="card-body">
            <h5 class="card-title">Sprawdź najbliższe seanse</h5>
            <p class="card-text">Znajdź seanse w naszym kinie w najbliższym czasie. Sprawdź dostępne godziny i zarezerwuj miejsce!</p>
            <button class="btn btn-success" @click="showSeanse">Zobacz Seanse</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["changePage"]);

function showMovies() {
  emit("changePage", "Movies"); // Emituj nazwę widoku "Movies"
}

function showSeanse() {
  emit("changePage", "Seanse"); // Emituj nazwę widoku "Seanse"
}
</script>

<style scoped>
/* Stylizacja dla sekcji powitalnej */
.jumbotron {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}

.card {
  border: none;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

/* Dostosowanie przycisków */
.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-success {
  background-color: #28a745;
  border: none;
}

/* Marginesy i odstępy */
.mb-4 {
  margin-bottom: 30px;
}

/* Stylizacja alertu */
.alert-info {
  background-color: #e9f7fd;
  color: #5bc0de;
}
</style>
