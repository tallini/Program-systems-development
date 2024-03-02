"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_class_1 = require("./main-class");
const express_1 = __importDefault(require("express"));
// let vs. var vs. const
// any vs. unknown
// undefined vs. null
// === vs. ==
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    let myClass = new main_class_1.MainClass();
    res.status(200).send('Hello, World!');
});
app.get('/callback', (req, res) => {
    let myClass = new main_class_1.MainClass();
    myClass.monitoringCallback((error, result) => {
        if (error) {
            res.write(error);
            res.status(400).end();
        }
        else {
            res.write(result);
            res.status(200).end();
        }
    });
});
app.get('/promise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let myClass = new main_class_1.MainClass();
    /* myClass.monitoringPromise().then((data: string) => {
        res.write(data);
        res.status(200).end();
    }).catch((error: string) => {
        res.write(error);
        res.status(400).end();
    }); */
    // async-await
    try {
        const data = yield myClass.monitoringPromise();
        res.write(data);
        res.status(200).end();
    }
    catch (error) {
        res.write(error);
        res.status(400).end();
    }
}));
app.get('/observable', (req, res) => {
    let myClass = new main_class_1.MainClass();
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
        next(data) {
            res.write(data);
        }, error(error) {
            res.status(400).end(error);
        }, complete() {
            res.status(200).end();
        }
    });
});
app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});
console.log('After server is ready.');
