const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

// Importation des modèles
const User = require('./user')(sequelize);
const Tontine = require('./tontine')(sequelize);
const Payment = require('./payment')(sequelize);

// Associations
Tontine.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Tontine, { foreignKey: 'userId' });

Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Tontine, { foreignKey: 'tontineId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Tontine.hasMany(Payment, { foreignKey: 'tontineId' });

module.exports = {
    sequelize,
    User,
    Tontine,
    Payment,
};