# 🎬 KinoVue - Projekt strony kina

## 📌 Opis projektu
KinoVue to strona internetowa kina, która pozwala użytkownikom:
- Przeglądać dostępne filmy
- Sprawdzać nadchodzące seanse
- Filtrować filmy i seanse
- Modyfikować swoje ustawienia użytkownika

Dodatkowo administratorzy mają możliwość zarządzania filmami i seansami.

---

## 🛠 Technologie
- **Frontend**: Vue 3 (Composition API, komponenty)
- **Backend**: Firebase (Firestore, Authentication, Storage)

---

## 🚀 Konfiguracja Firebase
Aby poprawnie skonfigurować Firebase w projekcie, wykonaj następujące kroki:

### 1️⃣ Pobranie klucza API
1. Zaloguj się na [Firebase Console](https://console.firebase.google.com/).
2. Utwórz nowy projekt lub wybierz istniejący.
3. Przejdź do **Project Settings** (Ustawienia projektu).
4. W sekcji **Your apps** (Twoje aplikacje) znajdź aplikację webową lub dodaj nową.
5. Skopiuj konfigurację Firebase, zwłaszcza klucz `apiKey`.

### 2️⃣ Utworzenie pliku konfiguracyjnego
1. W katalogu `src/` utwórz plik `firebaseConfig.js`.
2. Wklej swoją konfigurację Firebase do tego pliku:

```javascript
const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "your-auth-domain.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

export default firebaseConfig;
```

3. **Dodaj `firebaseConfig.js` do `.gitignore`**, aby nie udostępniać go publicznie.

### 3️⃣ Struktura bazy danych Firestore
W Firestore utwórz następujące kolekcje:
- **`Filmy`** – przechowuje informacje o dostępnych filmach.
- **`SeanseFilmowe`** – przechowuje informacje o nadchodzących seansach.
- **`admins`** – przechowuje dane administratorów.
  - W kolekcji `admins` dodaj dokument, którego **ID** to identyfikator użytkownika Firebase. Ten użytkownik będzie miał uprawnienia administracyjne.

Reguły dla kolekcji znajdują się w pliku **CollectionsRules.txt**.

### 4️⃣ Konfiguracja Firebase Storage
1. W **Firebase Storage** utwórz folder `userProfile`.
2. W folderze `userProfile` dodaj obraz `default.png`, który będzie domyślnym zdjęciem użytkownika.
3. Reguły bezpieczeństwa dla Storage znajdują się w pliku **StorageRules.txt**.

---

## 📂 Struktura projektu
```
vue-project/
│── src/
│   ├── firebaseConfig.js ❌ (ignorowany w repozytorium)
│   ├── firebaseConfig.example.js ✅ (przykładowy plik konfiguracyjny)
│   ├── components/
│   ├── views/
│── .gitignore
│── package.json
│── README.md
│── CollectionsRules.txt (reguły Firestore)
│── StorageRules.txt (reguły Storage)
```

---

## 🔧 Uruchomienie projektu
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/twoj-repozytorium.git
   cd vue-project
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Utwórz plik `src/firebaseConfig.js` i wklej do niego swoją konfigurację Firebase.
4. Uruchom projekt:
   ```bash
   npm run dev
   ```

Teraz strona powinna być dostępna pod adresem `http://localhost:5173/`.

---

## 👨‍💻 Uprawnienia administratora
Jeśli chcesz nadać sobie uprawnienia administratora:
1. Pobierz swoje **UID** użytkownika Firebase.
2. W kolekcji `admins` dodaj dokument, którego **ID** to Twoje **UID**.

Po ponownym uruchomieniu aplikacji powinieneś mieć dostęp do panelu administratora.

---

## 📜 Licencja
Projekt jest open-source i można go dowolnie modyfikować.

---

## Project Setup

```sh
npm install
```

### Kompilacja projektu

```sh
npm run dev
```
