const express = require('express');
const cors = require('cors');
const Utilisateur = require('./models/utilisateur');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const path = require('path');
app.use('./images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors());
app.use(require('./index_videos'));

app.get('/utilisateurs', async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.getAllUtilisateur();
        
        const utilisateursSansMdp = utilisateurs.map(u => {
            const { mot_de_passe, ...userSansMdp } = u;
            return userSansMdp;
        });
        
        res.status(200).json(utilisateursSansMdp);
    } catch (error) {        
        res.status(500).json({ error: error.message });
    }
});

app.post('/utilisateurs', async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe } = req.body;
        
        if (!nom || !prenom || !email || !mot_de_passe) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        
        const utilisateurs = await Utilisateur.getAllUtilisateur();
        const emailExiste = utilisateurs.some(user => user.email === email);
        
        if (emailExiste) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        const result = await Utilisateur.addUtilisateur(nom, prenom, email, mot_de_passe);
        const sucess = `Utilisateur ajouté avec succès ${prenom} !`;
        console.log(sucess);

        res.status(201).json({ message: 'Utilisateur ajouté avec succès', utilisateurId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.post('/connexion', async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        
        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }
        
        const utilisateur = await Utilisateur.verifierIdentifiants(email, mot_de_passe);
        
        if (!utilisateur) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
        
        res.status(200).json({
            message: 'Connexion réussie',
            utilisateur
        });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} ! `);
});