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

app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo)
app.post('/todo', auth, postOneTodo)
app.delete('/todo/:todoId', auth, deleteTodo)
app.put('/todo/:todoId', auth, editTodo)


// Users
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
} = require("./APIs/users")

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth, uploadProfilePhoto)
app.get('/user', auth, getUserDetail)
app.post('/user', auth, updateUserDetails)


exports.api = functions.https.onRequest(app);


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
