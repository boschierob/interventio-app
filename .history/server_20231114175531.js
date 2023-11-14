const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const data = require('./data.js');


const app = express();

// Utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware pour analyser les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));


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
      res.redirect(`/page/${employee.id}`);
  } else {
      // Rediriger vers la page de connexion en cas d'échec
      res.redirect('/login');
  }
});

// Route pour afficher la page principale
app.get('/page/:employeeId', (req, res) => {
  const employeeId = parseInt(req.params.employeeId, 10);
  const employee = data.employees.find(e => e.id === employeeId);
  const customers = data.customers.filter(customer => Array.isArray(customer.userId) ? customer.userId.includes(employeeId) : customer.userId === employeeId);

  res.render('page', { employee, customers });
});


const server = app.listen( port|| 3000 , () => {
  console.log('Serveur Node.js en cours d exécution sur le port 3000');
});
