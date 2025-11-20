const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'contacts_db'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour récupérer tous les contacts
app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts ORDER BY id DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des contacts:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

// Route pour ajouter un contact
app.post('/contacts', (req, res) => {
  const { nom, email } = req.body;
  
  if (!nom || !email) {
    res.status(400).json({ error: 'Nom et email sont requis' });
    return;
  }
  
  const query = 'INSERT INTO contacts (nom, email) VALUES (?, ?)';
  
  db.query(query, [nom, email], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'ajout du contact:', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(201).json({ 
      id: results.insertId, 
      nom, 
      email,
      message: 'Contact ajouté avec succès' 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur frontend démarré sur le port ${PORT}`);
});