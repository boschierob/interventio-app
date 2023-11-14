const express = require('express');
const ejs = require('ejs');
const session = require('express-session'); // Ajout du module de session
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // Ajout du module fs pour la manipulation de fichiers

const port = 3000;
const data = require('./data.js');


const app = express();

// Utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware pour analyser les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour utiliser les sessions
app.use(session({
  secret: 'votre_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Utilisez true en production avec HTTPS
    maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie en millisecondes (1 jour dans cet exemple)
}
}));


// Route pour afficher le formulaire de connexion
app.get('/login', (req, res) => {
  res.render('login');
});

// Route pour traiter la soumission du formulaire de connexion
app.post('/login', (req, res) => {
  
  const { name, password } = req.body;

  const lowercaseName = name.toLowerCase();

  // Vérifier si l'employé existe dans les données
  const employee = data.employees.find(e => e.name.toLowerCase() === lowercaseName && e.password === password);

  if (employee) {
      // Rediriger vers la page principale avec l'ID de l'employé
      req.session.employeeId = employee.id;
      res.redirect('/page');
  } else {
      // Rediriger vers la page de connexion en cas d'échec
      res.redirect('/login');
  }
});

// Route pour afficher la page principale
app.get('/page', (req, res) => {
  const employeeId = req.session.employeeId;
  
  
    // Vérifier si l'employé est connecté
    if (employeeId) {
      // Récupérer les données de l'employé et des clients
      const employee = data.employees.find(e => e.id === employeeId);
      const customers = data.customers.filter(customer => Array.isArray(customer.userId) ? customer.userId.includes(employeeId) : customer.userId === employeeId);

      // Rendre la page avec les données en tant que variables
      res.render('page', { employee, customers });
  } else {
      // Rediriger vers la page de connexion si l'employé n'est pas connecté
      res.redirect('/login');
  }
});

// Route pour traiter la soumission du formulaire d'édition
app.post('/edit-intervention', (req, res) => {
  try {
      // Récupérer l'ID de l'employé depuis la session
      const employeeId = req.session.employeeId;

      // Vérifier si l'employé est connecté
      if (employeeId) {
          const customerId = parseInt(req.body.customerId, 10);
          const interventionDate = req.body.interventionDate;

          // Mettez à jour les données avec la nouvelle date d'intervention
          const customer = data.customers.find(c => c.id === customerId && (Array.isArray(c.userId) ? c.userId.includes(employeeId) : c.userId === employeeId));

          if (customer) {
              if (!customer.interventions) {
                  customer.interventions = [];
              }
              customer.interventions.push({ date: interventionDate });

              // Mettre à jour le fichier data.js
              //updateDataFile(data);

              // Rediriger vers la page principale après l'édition
              //res.redirect('/page');
          } else {
              // Gérer le cas où le client n'est pas trouvé (peut-être afficher un message d'erreur)
              res.redirect('/page');
          }
      } else {
          // Rediriger vers la page de connexion si l'employé n'est pas connecté
          res.redirect('/login');
      }
  } catch (error) {
      // Gérer les erreurs et rediriger vers la page principale
      console.error(error);
      res.redirect('/page');
  }
});

// Route pour la déconnexion
app.get('/logout', (req, res) => {
  // Logique de déconnexion, par exemple, détruire la session si vous en utilisez une
  // Puis rediriger vers la page de connexion
  // Exemple avec session :
  // req.session.destroy((err) => {
  //     if (err) {
  //         console.error("Erreur lors de la déconnexion :", err);
  //     }
  //     res.redirect('/login');
  // });

  // Exemple sans session :
  res.redirect('/login');
});


const server = app.listen( port|| 3000 , () => {
  console.log('Serveur Node.js en cours d exécution sur le port 3000');
});



// Fonction pour mettre à jour le fichier data.js
function updateDataFile(updatedData) {
  const dataPath = path.join(__dirname, 'data.js');

  // Convertir les données en format JSON
  const jsonData = JSON.stringify(updatedData, null, 2);

  // Écrire les données dans le fichier data.js
  fs.writeFileSync(dataPath, `module.exports = ${jsonData};`, 'utf-8');

}