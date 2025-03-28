const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function getConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'youtube'
        });
        console.log('✅ Connexion réussie !');
        return connection;
    } catch (error) {
        console.error('❌ Erreur de connexion à la base de données :', error);
        throw error;
    }
}

class Utilisateur {
    static async getAllUtilisateur() {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM utilisateurs');
        await connection.end();
        return result;
    }

    static async addUtilisateur(nom, prenom, email, mot_de_passe) {
        const connection = await getConnection();
        
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);
            
            const [result] = await connection.execute(
                'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
                [nom, prenom, email, hashedPassword]
            );
            return result;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            throw error;
        } finally {
            await connection.end();
        }
    }

    static async verifierIdentifiants(email, mot_de_passe) {
        const connection = await getConnection();
        
        try {
            const [utilisateurs] = await connection.query(
                'SELECT * FROM utilisateurs WHERE email = ?',
                [email]
            );
            
            if (utilisateurs.length === 0) {
                return null;
            }
            
            const utilisateur = utilisateurs[0];
            
            const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
            
            if (!motDePasseValide) {
                return null;
            }
            
            const { mot_de_passe: _, ...utilisateurSansMdp } = utilisateur;
            return utilisateurSansMdp;
        } catch (error) {
            console.error('Erreur lors de la vérification des identifiants :', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}

module.exports = Utilisateur;