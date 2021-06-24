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
    apiKey: "AIzaSyB7fefNbl0ACz3yTNn26sgd3phwA1T2RWU",
    authDomain: "recipes-55.firebaseapp.com",
    projectId: "recipes-55",
    storageBucket: "recipes-55.appspot.com",
    messagingSenderId: "74446821365",
    appId: "1:74446821365:web:78e1653de001802e3972bc",
    measurementId: "G-FQPGW4Q09P"
  }
}

const prod = local;

export default getConfig;
