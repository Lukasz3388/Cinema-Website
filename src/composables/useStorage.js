import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";

export function useStorage() {
  const currentUser = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const images = ref([]);

  // Nasłuchiwanie zmiany stanu logowania
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      currentUser.value = { email: user.email, uid: user.uid };
      await loadImages(); // Ładowanie zdjęć po zalogowaniu
    } else {
      currentUser.value = null;
      images.value = []; // Czyścimy zdjęcia po wylogowaniu
    }
  });

  // Funkcja do logowania na konkretnego użytkownika
  const loginUser = async (email, password) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = "Błąd logowania.";
      console.error(err);
    }
  };

  // Funkcja do wylogowywania się
  const logoutUser = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      error.value = "Błąd wylogowywania.";
      console.error(err);
    }
  };

  // Funkcja do uploadu zdjęcia
  const uploadImage = async (file) => {
    if (!currentUser.value) {
      error.value = "Musisz być zalogowany!";
      return;
    }

    const storage = getStorage();
    const userId = currentUser.value.uid;
    const imageRef = storageRef(storage, `pictures/${userId}/${file.name}`);

    loading.value = true;

    try {
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      images.value.push({ url: downloadURL, name: file.name });  // Dodajemy URL i nazwę pliku do listy
      return downloadURL;
    } catch (err) {
      error.value = "Błąd podczas dodawania zdjęcia.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Funkcja do ładowania zdjęć użytkownika
  const loadImages = async () => {
    if (!currentUser.value) {
      error.value = "Musisz być zalogowany!";
      return;
    }

    const storage = getStorage();
    const userId = currentUser.value.uid;
    const imagesRef = storageRef(storage, `pictures/${userId}`);

    try {
      const result = await listAll(imagesRef);
      const imageUrls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name }; // Zwracamy URL oraz nazwę pliku
        })
      );
      images.value = imageUrls;  // Ustawiamy zdjęcia w aplikacji
    } catch (err) {
      error.value = "Błąd podczas pobierania zdjęć.";
      console.error(err);
    }
  };

  // Funkcja do usuwania zdjęć
  const deleteImage = async (fileName) => {
    if (!currentUser.value) {
      error.value = "Musisz być zalogowany!";
      return;
    }

    const storage = getStorage();
    const userId = currentUser.value.uid;
    const imageRef = storageRef(storage, `pictures/${userId}/${fileName}`);

    try {
      await deleteObject(imageRef);
      images.value = images.value.filter((img) => img.name !== fileName);  // Usuwamy plik z listy
    } catch (err) {
      error.value = "Błąd podczas usuwania zdjęcia.";
      console.error(err);
    }
  };

  return {
    currentUser,
    loginUser,
    logoutUser,
    uploadImage,
    loadImages,
    getImages: loadImages, // Alias do loadImages
    deleteImage,
    error,
    loading,
    images,
  };
}
