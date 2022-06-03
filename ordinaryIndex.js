const express = require('express');
require('./helpers/dbConnection');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares');
const server = express();
const {userRouter} = require('./routes/user')
const {commentRouter} = require('./routes/comment')
const {articleRouter} = require('./routes/article')


server.use(bodyParser.json());
server.use(['user', '/users'], userRouter);
server.use(['/article', '/articles'], articleRouter);
server.use(['/comment', '/comments'], commentRouter);


server.use(errorHandler);

server.listen(3000, 'localhost', () => {
    console.log(`server is listening on: 3000`);
});