function getConfig () {
  switch(process.env.NODE_ENV) {
    case 'production':
      return prod;
    default:
      return local;
  }
};

const local = {
  firebase: {
    apiKey: "AIzaSyAlqjRl7NdTtlGNSDl77MKYKLSasJo3Pe4",
    authDomain: "recepies01.firebaseapp.com",
    projectId: "recepies01",
    storageBucket: "recepies01.appspot.com",
    messagingSenderId: "572692453056",
    appId: "1:572692453056:web:4c65c2ed7499a253bebf25",
    measurementId: "G-R6967XP2E9",
    useEmulator: false
  }
}

const prod = local;

export default getConfig;
