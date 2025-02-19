class Video {

    //FONCTION POUR RECUPERER TOUS LES VIDEOS
    static async getAllVideo() {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM videos');
        await connection.end();
        return result;
    }

    //FONCTION POUR FILTRER LES VIDEOS


}

module.exports = Video;
