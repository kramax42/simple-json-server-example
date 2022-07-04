const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

const routesRewriter = {
	'/api/questions/javascript': '/javascriptQuestions',
	'/api/questions/typescript': '/typescriptQuestions',
	'/api/questions/nodejs': '/nodejsQuestions',
};

// Middlewares.
server.use(middlewares);
server.use(jsonServer.rewriter(routesRewriter));
server.use(router);
server.use('/api', router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
