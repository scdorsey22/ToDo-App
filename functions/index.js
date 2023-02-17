const functions = require("firebase-functions");
const app = require('express')();
const auth = require('./util/auth')
const cors = require("cors")({ origin: true });

// Todos
const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

app.get('/todos', cors, auth, getAllTodos);
app.get('/todo/:todoId', cors, auth, getOneTodo)
app.post('/todo', cors, auth, postOneTodo)
app.delete('/todo/:todoId', cors, auth, deleteTodo)
app.put('/todo/:todoId', cors, auth, editTodo)

// Users
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
} = require("./APIs/users")

app.post('/login', cors, loginUser)
app.post('/signup', cors, signUpUser)
app.post('/user/image', cors, auth, uploadProfilePhoto)
app.get('/user', cors, auth, getUserDetail)
app.post('/user', cors, auth, updateUserDetails)

exports.api = functions.https.onRequest(app);



// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
