const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// Middleware pour traiter les requêtes JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Faites ici le traitement des données, par exemple, une vérification d'authentification.
  // Vous pouvez également renvoyer une réponse au client.

  // Exemple : renvoyer un message JSON de confirmation
  res.json({ message: 'Connexion réussie' });
});

// Route pour gérer le clic et renvoyer l'en-tête personnalisé
app.post('/changer-couleur', (req, res) => {
    // Traitez la logique du serveur ici
    const color = blue;
 
     res.json({ color : color});

});


const server = app.listen(3000, () => {
  console.log('Serveur Node.js en cours d exécution sur le port 3000');
});
