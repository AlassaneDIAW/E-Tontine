const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'e_tontine',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de connexion
pool.getConnection()
    .then(conn => {
        console.log('✅ Connecté à la base de données MySQL');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Erreur de connexion à MySQL:', err.message);
    });

module.exports = pool;