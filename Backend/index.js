const express = require('express');
const { connectToMongoDB, createCollectionIfNotExists, insertDocument,getAllDocuments, findDocumentsByAttribute, updateDocument,deleteDocument } = require('./mongoOperations');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: '*'
  }));

app.post('/register', async (req, res) => {
    const client = await connectToMongoDB();
    const db = client.db();
    const { username, password, email } = req.body;

    // Check if username or email already exists
    const userExists = await findDocumentsByAttribute(db, 'Users', 'username', username);
    const emailExists = await findDocumentsByAttribute(db, 'Users', 'email', email);

    console.log(userExists);
    console.log(emailExists);
    console.log((userExists || emailExists));
    
    if (userExists.length > 0 || emailExists.length > 0) {
        res.status(400).send('Username or Email already exists');
        await client.close();
        return;
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Insert the user into the database
    await insertDocument(db, 'Users', { username, email, password: hashedPassword });

    await client.close();
    res.status(200).send('User registered successfully');
});


app.post('/login', async (req, res) => {
    const client = await connectToMongoDB();
    const db = client.db();
    const { email, password } = req.body;
    console.log(email, password);

    // Find the user in the database
    var user = await findDocumentsByAttribute(db, 'Users', 'email', email);
    if(user.length>0){
        user = user[0];
    }
    console.log(user);
    if (!user) {
        res.status(404).send('No user found');
        return;
    }

    console.log(password);
    console.log(user.password);
    // Check the password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        res.status(401).send({ auth: false, token: null });
        return;
    }
    

    // Create a token
    const token = jwt.sign({ id: user._id }, 'your-secret-key', {
        expiresIn: 86400 // expires in 24 hours
    });

    await client.close();
    res.status(200).send({ auth: true, token,user: { username: user.username, email: user.email, id: user._id } });
});

app.post('/insertDocument', async (req, res) => {
    // Model_json = {
    //     "collectionName": "User",
    //     "document": {
            // "name": "John Doe",
            // "position": "Software Developer",
    //     }
    //   }
      
    const client = await connectToMongoDB();
    const db = client.db();
    const { collectionName, document } = req.body;

    await insertDocument(db, collectionName, document);

    await client.close();
    res.status(200).send('Document inserted successfully');
});


app.post('/findDocuments', async (req, res) => {
    //  model_json = {
    //     "collectionName": "tasks",
    //     "attribute": "status",
    //     "value": "To Do"
    // }

    const client = await connectToMongoDB();
    const db = client.db();
    const { collectionName, attribute, value } = req.body;

    const documents = await findDocumentsByAttribute(db, collectionName, attribute, value);

    await client.close();
    res.status(200).send(documents);
});


app.post('/getAllDocuments', async (req, res) => {
    // model_json = {
    //     "collectionName": "tasks"
    // } 
    const client = await connectToMongoDB();
    const db = client.db();
    const { collectionName } = req.body;

    const documents = await getAllDocuments(db, collectionName);

    await client.close();
    res.status(200).send(documents);
});

app.post('/updateDocument', async (req, res) => {
    // model_json = {
    //     "collectionName": "tasks",
    //     "query": {
    //         "status": "To Do"
    //     },
    //     "update": {
    //         "$set": {
    //             "status": "In Progress"
    //         }
    //     }
    // }
    const client = await connectToMongoDB();
    const db = client.db();
    const { collectionName, query, update } = req.body;

    await updateDocument(db, collectionName, query, update);

    await client.close();
    res.status(200).send('Document updated successfully');
});

app.post('/deleteDocument', async (req, res) => {
    // model_json = {
    //     "collectionName": "tasks",
    //     "query": {
    //         "status": "Done"
    //     }
    // }
    const client = await connectToMongoDB();
    const db = client.db();
    const { collectionName, query } = req.body;

    await deleteDocument(db, collectionName, query);

    await client.close();
    res.status(200).send('Document deleted successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
