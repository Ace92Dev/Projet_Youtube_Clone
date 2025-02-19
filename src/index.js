const express = require('express');
const Utilisateur = require('./models/utilisateur');
require ('dotenv').config();

const app = express();
app.use(express.json());

//EndPoints

app.get('/utilisateurs', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.getAllUtilisateur();
        res.status(200).json(utilisateur);
    }   catch (error) {        
        res.status(500).json({ error: error.message });
    }
});

app.post('/utilisateurs', async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe } = req.body;
        const sucess = `Utilisateur ajouté avec succès ${nom} !`;	
        if (!nom || !prenom || !email || !mot_de_passe) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const result = await Utilisateur.addUtilisateur(nom, prenom, email, mot_de_passe);
        console.log(sucess);

        res.status(201).json({ message: 'Utilisateur ajouté avec succès', result });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} ! `);
});