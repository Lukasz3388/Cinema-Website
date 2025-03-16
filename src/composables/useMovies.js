import { ref, onMounted } from "vue";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase";

export function useMovies() {
  const movies = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Filmy"));
      movies.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (err) {
      error.value = "Nie udało się pobrać danych z Firestore.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "Filmy", id));
      movies.value = movies.value.filter((movie) => movie.id !== id);
    } catch (err) {
      error.value = "Nie udało się usunąć filmu.";
      console.error(err);
    }
  };

  const addMovie = async (movie) => {
    try {
      // Tworzymy kopię obiektu bez `id`
      const { id, ...movieData } = movie;
  
      // Dodajemy dokument do Firestore
      const docRef = await addDoc(collection(db, "Filmy"), movieData);
  
      // Pobieramy wygenerowane ID i dodajemy do lokalnej listy
      movies.value.push({ id: docRef.id, ...movieData });
    } catch (err) {
      error.value = "Nie udało się dodać filmu.";
      console.error(err);
    }
  };
  
  const updateMovie = async (movie) => {
    try {
      const docRef = doc(db, "Filmy", movie.id);
      await updateDoc(docRef, {
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        rating: movie.rating,
        year: movie.year,
        image: movie.image,
      });
      const index = movies.value.findIndex((m) => m.id === movie.id);
      if (index !== -1) {
        movies.value[index] = { ...movie };
      }
    } catch (err) {
      error.value = "Nie udało się zaktualizować filmu.";
      console.error(err);
    }
  };

  onMounted(fetchMovies);

  return {
    movies,
    loading,
    error,
    deleteMovie,
    addMovie,
    updateMovie,
  };
}
