<template>
  <!-- Nagłówek -->
  <div id="app">
    <!-- Główna zawartość strony -->
    <router-view></router-view>
  </div>
  
  <!-- Stopka -->
  <footer class="footer">
    <Footer />
  </footer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Footer from '@/components/FooterPage.vue'

</script>

<style>
/* Resetowanie marginesów i paddingów */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Stylizacja całej aplikacji */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Tło dla jasnego motywu */
body.light-mode {
  background: linear-gradient(to right, #f0f0f0 15%, #ffffff 15%, #ffffff 85%, #f0f0f0 85%);
}

/* Tło dla ciemnego motywu z gradientem */
body.dark-mode {
  background: linear-gradient(to right, #121212 15%, #1a1a1a 15%, #1a1a1a 85%, #121212 85%);
  color: #ffffff; /* Jasny kolor tekstu na ciemnym tle */
}

/* Nagłówek */
.header {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #343a40;
}

/* Główna zawartość strony */
.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 80px auto 20px auto; /* Margines górny dla nagłówka */
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Stopka */
.footer {
  width: 100%;
  background-color: #343a40;
  color: #fff;
  text-align: center;
  padding: 10px;
}
</style>
