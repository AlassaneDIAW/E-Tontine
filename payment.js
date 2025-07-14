const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        montant: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        date_paiement: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Payment;
};