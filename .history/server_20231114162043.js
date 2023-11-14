const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
// Middleware pour traiter les requêtes JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('login.ejs');
});

app.get('/login', (req, res) => {
  // Traitez la logique du serveur ici

  // Changer la couleur de fond aléatoirement (exemple)
  const backgroundColor = "blue";

  // Rendre la page avec la couleur en tant que variable
  res.render('login', { backgroundColor : backgroundColor });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Faites ici le traitement des données, par exemple, une vérification d'authentification.
  // Vous pouvez également renvoyer une réponse au client.

  // Exemple : renvoyer un message JSON de confirmation
  res.json({ message: 'Connexion réussie' });
});

// Route pour changer la couleur de fond
app.get('/changer-couleur', (req, res) => {
  // Traitez la logique du serveur ici

  // Changer la couleur de fond aléatoirement (exemple)
  const randomColor = "orange";

  // Renvoyer uniquement la couleur (sans envelopper dans un objet JSON)
  res.send(`<div class="click" style="background-color: ${randomColor};">Cliquez ici</div>`);
});


const server = app.listen(3000, () => {
  console.log('Serveur Node.js en cours d exécution sur le port 3000');
});
