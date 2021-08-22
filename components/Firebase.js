import firebase from 'firebase';
const config={
    apiKey: "AIzaSyC0iGKTa4OkHNAdagFMveEjODi09XtrVhE",
    authDomain: "ftd-play-music.firebaseapp.com",
    databaseURL: "https://ftd-play-music.firebaseio.com",
    projectId: "ftd-play-music",
    storageBucket: "ftd-play-music.appspot.com",
    messagingSenderId: "817506514062",
    appId: "1:817506514062:web:c237972508f50eb5b545df",
    measurementId: "G-KB16NK19KP"
}
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();;