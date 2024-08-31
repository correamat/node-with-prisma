import Express from "express";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const app = Express();
app.use(Express.json());
const PORT = 3006;

app.get('/', async (request, response) => {
    return response.send({ message: 'Hello World!' });
});

app.post('/user/create', UserController.createUser);
app.post('/post/create', PostController.createPost);
app.post('/post/update', PostController.updatePost);
app.delete('/post/delete/:id', PostController.deletePost);
app.get('/post/get/:id', PostController.getPost);
app.get('/post', PostController.listPosts);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});