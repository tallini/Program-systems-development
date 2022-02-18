import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from './model/User';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

passport.serializeUser((user: Express.User, done) => {
    console.log('user is serialized.');
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    console.log('user is deserialized.');
    done(null, user);
});

passport.use('local', new passportLocal.Strategy((email, password, done) => {
    if (email === 'test@test.com' && password === 'testpw') {
        done(null, new User(email, password));
    } else {
        done('Incorrect username or password.');
    }
}));

app.use(expressSession({secret: 'testsecret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/app', require('./routes/routes')(passport, express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port 3000...');
});