import { Db, MongoClient } from 'mongodb';

let databaseInstance: Db | null = null;

class Database {
    getDatabase() {
        if (!databaseInstance) {
            const client = new MongoClient('mongodb://localhost:27017');
            databaseInstance = client.db('HMCS');

            process.on('SIGINT', async () => {
                await client.close();
                process.exit();
            });
        }

        return databaseInstance;
    };
}

export default Database;