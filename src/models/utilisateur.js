const mysql = require('mysql2/promise');

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

    //FONCTION POUR RECUPERER TOUS LES UTILISATEURS
    static async getAllUtilisateur() {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM utilisateurs');
        await connection.end();
        return result;
    }

    //FONCTION POUR AJOUTER UN UTILISATEUR

    static async addUtilisateur(nom, prenom, email, mot_de_passe) {
      const connection = await getConnection();
      const [result] = await connection.execute(
          'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
          [nom, prenom, email, mot_de_passe]
      );
      await connection.end();
      return result;
  }

}

module.exports = Utilisateur;
