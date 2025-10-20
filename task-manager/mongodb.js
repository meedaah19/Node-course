import { MongoClient, ObjectId } from "mongodb";

const connectionURL = 'mongodb://127.0.0.1:27017/'
const client = new MongoClient(connectionURL);

const databaseName = 'tast-manager'


async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(databaseName);
        const collection = db.collection('tasks');
        const result = await collection.deleteMany({completed: false });
        console.log(result.deletedCount);
    } catch (error) {
        console.log('Unable to fetch')
    } finally{
        return 'done.';
    }
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());