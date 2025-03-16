// src/composables/useSeanse.js
import { ref, onMounted } from "vue";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase"; // Import instancji db z firebase.js

export function useSeanse() {
  const seanse = ref([]);  // Przechowuje pobrane seanse
  const loading = ref(true);  // Stan ładowania
  const error = ref(null);  // Obsługa błędów

  // Funkcja pobierająca seanse z Firestore
  const fetchSeanse = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "SeanseFilmowe"));
      seanse.value = querySnapshot.docs.map((doc) => ({
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

  // Funkcja usuwająca seans z Firestore
  const deleteSeans = async (id) => {
    try {
      await deleteDoc(doc(db, "SeanseFilmowe", id));
      seanse.value = seanse.value.filter((seans) => seans.id !== id);
      console.log(`Seans o ID ${id} został usunięty.`);
    } catch (err) {
      error.value = "Nie udało się usunąć seansu.";
      console.error(err);
    }
  };

  // Funkcja dodająca nowy seans do Firestore
  const addSeans = async (newSeans) => {
    try {
      const docRef = await addDoc(collection(db, "SeanseFilmowe"), {
        movieName: newSeans.movieName,
        date: newSeans.date,
        hall: newSeans.hall,
        language: newSeans.language,
        subtitles: newSeans.subtitles === "true", // Przekształcamy string na boolean
        time: newSeans.time,
      });
      console.log("Nowy seans został dodany: ", docRef.id);
      await fetchSeanse();
    } catch (err) {
      error.value = "Nie udało się dodać seansu.";
      console.error("Błąd podczas dodawania seansu:", err);
    }
  };

  // Funkcja aktualizująca istniejący seans w Firestore
  const updateSeans = async (updatedSeans) => {
    try {
      const docRef = doc(db, "SeanseFilmowe", updatedSeans.id);
      await updateDoc(docRef, {
        movieName: updatedSeans.movieName,
        date: updatedSeans.date,
        hall: updatedSeans.hall,
        language: updatedSeans.language,
        subtitles: updatedSeans.subtitles === "true",
        time: updatedSeans.time,
      });
      console.log(`Seans o ID ${updatedSeans.id} został zaktualizowany.`);
      await fetchSeanse(); // Odśwież listę seansów
    } catch (err) {
      error.value = "Nie udało się zaktualizować seansu.";
      console.error("Błąd podczas aktualizacji seansu:", err);
    }
  };

  onMounted(fetchSeanse);

  return {
    seanse,
    loading,
    error,
    deleteSeans,
    addSeans,
    updateSeans, // Eksport funkcji aktualizacji seansu
  };
}
