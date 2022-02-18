import { NextFunction, Request, Response } from 'express';
import { MainClass } from '../main-class';
import { User } from '../model/User';

// asynchronous, non-blocking I/O
// HTTP protocol-based
// HTTP (code,display)
// 200 - OK
// 404 - Not Found

// Router middleware 
module.exports = (passport: any, router: any) => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        let message = myClass.greeting();
        res.status(200).send(message);
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        res.setHeader('Transfer-Encoding', 'chunked');

        // async-await
        try {
            const data = await myClass.greetingPromise();
            res.write(data);
            res.status(200).end();
        } catch (error: any) {
            res.write(error);
            res.status(404).end();
        }

        /* myClass.greetingPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(404).end();
        }); */
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        res.setHeader('Transfer-Encoding', 'chunked');

        myClass.greetingObservable().subscribe((data: string) => {
            res.write(data);
        }, (error: string) => {
            res.status(404).end(error);
        }, () => {
            res.status(200).end();
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        // authentication
        passport.authenticate('local', (error: any, user: User) => {
            if (error) {
                res.status(500).send(error);
            } else {
                req.login(user, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send('Incorrect username or password.');
                    } else {
                        res.status(200).send(user);
                    }
                });
            }
        })(req, res, next);
    });

    router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            req.logout();
            res.status(200).send('Successfully logged out.');
        } else {
            res.status(500).send('User is not logged in.');
        }
        
        
    });

    return router;

}
