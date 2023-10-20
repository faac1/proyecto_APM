const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://program-7a162.firebaseio.com' // Reemplaza con la URL de tu base de datos Firebase
});

// Rutas de la API
app.post('/api/registrar-usuario', async (req, res) => {
  try {
    const { email, password, nombre, role } = req.body;
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      nombre: nombre,
      role: role

    });
    res.json({ message: 'Usuario registrado con éxito', uid: userRecord.uid });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


// Puerto en el que se ejecutará la API
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API en ejecución en el puerto ${PORT}`);
});
