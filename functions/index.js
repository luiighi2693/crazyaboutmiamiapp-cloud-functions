// Importamos functions desde firebasebase-funcions
const functions = require('firebase-functions');
// Importamos firebase-admin para conectarnos con la base de datos
const firebase = require('firebase-admin');
// Importamos el archivo de configuración que descargamos
const config = require('./firebase-config.json');
// inicializamos nuestra aplicación
firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: 'https://czechrepublic-224514.firebaseio.com' // URL de nuestro proyecto
});

// creamos la función que obtiene los recursos de nuestra firebase database 
exports.api = functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'POST') {
    const data = firebase.database().ref('users/' + req.body.userId).set(req.body);

    res.json({
    	"status":"created",
    });
  }

  if (req.method === 'GET') {
	if (req.query.userId !== null && req.query.userId !== undefined) {
		const data = firebase.database().ref('users/' + req.query.userId) // Hacemos referencia a la base de datos
		    data.on('value', (snapshot) => {
		      res.json(snapshot.val()); // El elemento resultante lo exponemos en un archivo JSON
		    });
	} else {
		const data = firebase.database().ref('users/') // Hacemos referencia a la base de datos
	    data.on('value', (snapshot) => {
	      res.json(snapshot.val()); // El elemento resultante lo exponemos en un archivo JSON
	    });
	}
  }

  if (req.method === 'PUT') {
    const data = firebase.database().ref('users/' + req.query.userId).update(req.body);

    res.json({
    	"status":"updated",
    });
  }

  if (req.method === 'DELETE') {
    const data = firebase.database().ref('users/' + req.query.userId).remove();

    res.json({
    	"status":"deleted",
    });
  }
});