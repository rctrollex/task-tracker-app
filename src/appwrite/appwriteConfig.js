import { Client, Databases } from 'appwrite';
const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68192c10002c13c2b65e');

const databases = new Databases(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
export { client, databases, databaseId,collectionId };