<!-- Movies.vue -->
<template>
    <div class="container my-5">
      <h2>Seanse</h2>
      <p>Sprawdź najbliższe seanse filmowe</p>
      <div class="row">
        <div class="col-12 col-md-4 mb-3" v-for="seans in seanse" :key="seans.id">
          <div class="card shadow-lg border-light rounded">
            <div class="card-body">
              <h5 class="card-title bg-success text-white p-2">{{ seans.movieName }}</h5>
              <p class="card-text"><b>Data:</b> {{ seans.date }}</p>
              <p class="card-text"><b>Godzina:</b> {{ seans.time }}</p>
              <p class="card-text"><b>Sala:</b> {{ seans.hall }}</p>
              <p class="card-text"><b>Język:</b> {{ seans.language }}</p>
              <p class="card-text"><b>Napisy:</b> {{ seans.subtitles ? 'tak' : 'nie' }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  import { useSeanse } from "@/composables/useSeanse";

  const { seanse, loading, error } = useSeanse();

  </script>
  