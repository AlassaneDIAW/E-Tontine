const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Pour MySQL
const app = express();

// Middleware CORS configuré avant les routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la connexion MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'Diaw',
    password: '0504',
    database: 'e_tontine_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de connexion à la base de données
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connecté à la base de données MySQL');
        connection.release();
    } catch (err) {
        console.error('❌ Erreur de connexion à MySQL:', err);
    }
}
testConnection();

// Route de test
app.get('/', (req, res) => {
    res.send('API e-Tontine opérationnelle');
});

// Route pour les tontines
app.get('/tontines', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tontines');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint non trouvé' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5050;
app.listen(5050, () => {
    console.log("🚀 Serveur backend démarré sur http://localhost:5050");
});

module.exports = app; // Pour les tests