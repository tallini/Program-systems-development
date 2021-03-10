import { MainClass } from './main_class';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.status(404).send('This is not an available route, please try /promise or /observable.');
})

app.get('/promise', (req, res) => {
	let myClass = new MainClass();
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	res.setHeader('Transfer-Encoding', 'chunked');
	res.write('Waiting for the result from Promise...\n');
	myClass.greetingPromise().then((data: string) => {
		res.write(data);
		res.status(200).end();	
	}).catch((error: string) => {
		res.write(error);
		res.status(404).end();
	});
});

app.get('/observable', (req, res) => {
	let myClass = new MainClass();
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	res.setHeader('Transfer-Encoding', 'chunked');
	myClass.greetingObservable().subscribe((data: string) => {
		res.write(data);	
	}, (error: string) => {
		res.status(404).end(error);
	}, () => {
		res.status(200).end();
	});
});

app.listen(port, () => {
	console.log('App is listening on port 3000...');
});

