const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://optimusapg2:nMxFmb7wkq6Xy6Z@taskmasterabhra.h6lzmfu.mongodb.net/?retryWrites=true&w=majority&appName=TaskMasterAbhra';

// Function to connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

// Function to create a collection if it doesn't exist
async function createCollectionIfNotExists(db, collectionName) {
    try {
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        if (!collectionNames.includes(collectionName)) {
            await db.createCollection(collectionName);
            console.log(`Collection '${collectionName}' created`);
        } else {
            console.log(`Collection '${collectionName}' already exists`);
        }
    } catch (error) {
        console.error(`Error creating collection '${collectionName}':`, error);
    }
}

// Function to insert a JSON object into a collection
async function insertDocument(db, collectionName, document) {
    try {
        const collection = db.collection(collectionName);
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(collection => collection.name);
        if (!collectionNames.includes(collectionName)) {
            await createCollectionIfNotExists(db, collectionName);
        }
        await collection.insertOne(document);
        console.log('Document inserted successfully');
    } catch (error) {
        console.error('Error inserting document:', error);
    }
}

// Function to retrieve data from a collection based on a specific attribute
async function findDocumentsByAttribute(db, collectionName, attribute, value) {
    try {
        const collection = db.collection(collectionName);
        const query = { [attribute]: value };
        const result = await collection.find(query).toArray();
        console.log('Documents found:', result);
        return result;
    } catch (error) {
        console.error('Error finding documents:', error);
    }
}

// Function to retrieve all documents from a collection
async function getAllDocuments(db, collectionName) {
    try {
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        console.log(`All documents in collection '${collectionName}':`, documents);
        return documents;
    } catch (error) {
        console.error(`Error retrieving documents from collection '${collectionName}':`, error);
    }
}

//Function to update a document in a collection
async function updateDocument(db, collectionName, query, update) {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(query, update);
        console.log('Document updated successfully');
    }
    catch (error) {
        console.error('Error updating document:', error);
    }
}

// Function to delete a document from a collection by id

async function deleteDocument(db, collectionName, query) {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne(query);
        console.log('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

module.exports = {
    connectToMongoDB,
    createCollectionIfNotExists,
    insertDocument,
    findDocumentsByAttribute,
    getAllDocuments,
    updateDocument,
    deleteDocument
};
