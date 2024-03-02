import { MainClass } from './main-class';
import express from 'express';
import { Request, Response } from 'express';
import { lastValueFrom, take } from 'rxjs';

// let vs. var vs. const
// any vs. unknown
// undefined vs. null
// === vs. ==

const app = express();
const port = 5000;


app.get('/', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.status(200).send('Hello, World!');
});

app.get('/callback', (req: Request, res: Response) => {
    let myClass = new MainClass();
    myClass.monitoringCallback((error, result) => {
        if (error) {
            res.write(error);
            res.status(400).end();
        } else {
            res.write(result);
            res.status(200).end();
        }
    });
});

app.get('/promise', async (req: Request, res: Response) => {
    let myClass = new MainClass();
    /* myClass.monitoringPromise().then((data: string) => {
        res.write(data);
        res.status(200).end();
    }).catch((error: string) => {
        res.write(error);
        res.status(400).end();
    }); */


    // async-await
    try {
        const data = await myClass.monitoringPromise();
        res.write(data);
        res.status(200).end();
    } catch(error) {
        res.write(error);
        res.status(400).end();
    }
});


app.get('/observable', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    // deprecated variant
    /* myClass.monitoringObservable().subscribe((data) => {
        console.log(data);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('complete');
    }); */

    myClass.monitoringObservable().subscribe({
        next(data: string) {
            res.write(data);
        }, error(error: string) {
            res.status(400).end(error);
        }, complete() {
            res.status(200).end();
        }
    });
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

console.log('After server is ready.');

