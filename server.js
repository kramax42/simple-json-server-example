const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

const routesRewriter = {
	'/api/questions/javascript': '/javascriptQuestions',
	'/api/questions/typescript': '/typescriptQuestions',
	'/api/questions/nodejs': '/nodejsQuestions',
};

server.use(middlewares);
server.use(jsonServer.rewriter(routesRewriter));


server.get('/echo', (req, res) => {
	res.jsonp(req.query);
});

server.get(`/api/questions/:technology/size`, (req, res) => {
	const questionsSize =
		router.db['__wrapped__'][`${req.params.technology}Questions`].length;
	res.send({ [`${req.params.technology}QuestionsSize`]: questionsSize });
});

server.get(`/api/questions/sizes`, (req, res) => {
	const dbData = router.db['__wrapped__'];
	const questionsListsSizes = {};

	for (const [technology, technologyQuestions] of Object.entries(dbData)) {
		const technologyName = technology.replace('Questions', '');
		questionsListsSizes[`${technologyName}`] = technologyQuestions.length;
	}

	res.send({ questionsListsSizes });
});

server.use(router);
server.use('/api', router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
