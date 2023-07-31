import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtXnI2GE4M0UDrekrK6y5FuJxpeeQOlsA",
  authDomain: "ichiban-frontend.firebaseapp.com",
  projectId: "ichiban-frontend",
  storageBucket: "ichiban-frontend.appspot.com",
  messagingSenderId: "415362415431",
  appId: "1:415362415431:web:58cce0d622c92c375caa62",
  measurementId: "G-T0SRKMGLGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
