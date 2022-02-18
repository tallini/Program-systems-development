import { MainClass } from './main_class';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	let myClass = new MainClass();
	res.status(200).send(myClass.greeting());
});

app.listen(port, () => {
	console.log('App is listening on port 3000...');
});

