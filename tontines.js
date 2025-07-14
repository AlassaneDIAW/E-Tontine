const express = require('express');
const router = express.Router();
const Tontine = require('../models/Tontine');

// GET toutes les tontines
router.get('/', async(req, res) => {
    try {
        const tontines = await Tontine.find();
        res.json(tontines);
    } catch (error) {
        console.error('Erreur lors de la récupération des tontines :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// POST création d’une tontine
router.post('/', async(req, res) => {
    try {
        const nouvelleTontine = new Tontine(req.body);
        await nouvelleTontine.save();
        res.status(201).json(nouvelleTontine);
    } catch (error) {
        console.error('Erreur lors de la création de la tontine :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;