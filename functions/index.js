const functions = require("firebase-functions");
const app = require('express')();
const auth = require('./util/auth')


// Todos
const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

app.get('/todos', getAllTodos);
app.get('/todo/:todoId', getOneTodo)
app.post('/todo', postOneTodo)
app.delete('/todo/:todoId', deleteTodo)
app.put('/todo/:todoId', editTodo)


// Users
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail
} = require("./APIs/users")

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth, uploadProfilePhoto)
app.get('/user', auth, getUserDetail)


exports.api = functions.https.onRequest(app);


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
