const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Tontine = sequelize.define('Tontine', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        montant: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        frequence_paiement: {
            type: DataTypes.ENUM('quotidien', 'hebdomadaire', 'mensuel', 'trimestriel', 'annuel'),
            allowNull: false,
        },
        date_creation: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        date_debut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        statut: {
            type: DataTypes.ENUM('active', 'inactive', 'terminee'),
            defaultValue: 'active',
        },
    });

    return Tontine;
};