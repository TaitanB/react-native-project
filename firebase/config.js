// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmsNNn3wS-IHpyQamEz3W8kU1mP_s_j-M",
  authDomain: "react-native-project-37124.firebaseapp.com",
  databaseURL: "https://react-native-project-37124.firebaseio.com",
  projectId: "react-native-project-37124",
  storageBucket: "react-native-project-37124.appspot.com",
  messagingSenderId: "912331812229",
  appId: "1:912331812229:android:6544c0a86151acc06568ec",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
