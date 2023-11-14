const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // Ajout du module fs pour la manipulation de fichiers
const uuid = require('uuid'); // Importez le module uuid

const port = 3000;
const data = require('./data.js');


const app = express();


// Utiliser EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware pour analyser les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisez cookie-parser middleware
app.use(cookieParser());



// Initialiser le stockage des interventions
const interventions = {};

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
    // Définir un cookie (par exemple, avec un identifiant utilisateur)
    res.cookie('employeeId', employee.id, { maxAge: 900000, httpOnly: true });
    res.redirect('/page');
  } else {
    // Rediriger vers la page de connexion en cas d'échec
    res.redirect('/login');
  }
});

// Route pour afficher la page principale
app.get('/page', (req, res) => {
  const employeeId = parseInt(req.cookies.employeeId);
  console.log(`employeeId session : ${req.cookies.employeeId}`);

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
    const employeeId = parseInt(req.cookies.employeeId);

    // Vérifier si l'employé est connecté
    if (employeeId) {
      const customerId = parseInt(req.body.customerId, 10);
      const interventionDate = req.body.interventionDate;

      // Mettez à jour les données avec la nouvelle date d'intervention
      const customer = data.customers.find(c => c.id === customerId && (Array.isArray(c.userId) ? c.userId.includes(employeeId) : c.userId === employeeId));

      // Générer un identifiant unique avec uuid
      const interventionId = uuid.v4();

      if (customer) {
        if (!customer.interventions) {
          customer.interventions = [];
        }
        customer.interventions.push({ id: interventionId, date: interventionDate });

        // Mettre à jour le fichier data.js
        updateDataFile(data);

        // Rediriger vers la page principale après l'édition
        res.redirect('/page');
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

// Votre route pour supprimer une date d'intervention
app.get('/delete-intervention/:customerId/:interventionId', (req, res) => {
  const employeeId = req.cookies.employeeId;
  const customerId = parseInt(req.params.customerId);
  const interventionId = req.params.interventionId;

  //console.log(`${interventionId} et ${customerId}`);

  // Récupérer les données du fichier data.js
  const { customers, employees } = data;

  // Rechercher l'utilisateur  en fonction de son id
  const user = employees.find(e => e.id === employeeId);
  console.log(user);
  if (user) {
      // Rechercher le client en fonction de son id
      const client = user.customers.find(c => c.id === customerId);

      if (client) {
          // Rechercher l'intervention dans les dates du client
          const interventionIndex = client.interventions.findIndex(intervention => intervention.id === interventionId);

          // Si l'intervention est trouvée, la supprimer
          if (interventionIndex !== -1) {
              client.interventions.splice(interventionIndex, 1);

              // Rediriger vers la page après la suppression
              res.redirect('/page');
              return; // Ajouter return pour éviter l'exécution du code suivant
          }
      }
  }

  // Si l'intervention n'est pas trouvée ou si l'utilisateur/client n'existe pas,
  // rediriger vers une page d'erreur ou une page appropriée
  res.status(404).send('Intervention not found');
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
  // Effacer le cookie de session
  res.clearCookie('employeeId');

  // Exemple sans session :
  res.redirect('/login');
});


const server = app.listen(port || 3000, () => {
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