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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const mini_db_1 = require("./mini_db");
const app = express();
const port = 5000;
app.get('/', (request, response) => {
    response.send('Hello world!');
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connected = yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test-xaxxa');
        console.log(connected.connection);
        if (connected.connection) {
            const user = new mini_db_1.User({
                login: 'Bill',
                password: 'bill@initech.com'
            });
            yield user.save();
            console.debug('Connection to the db');
            app.listen(port, () => console.log(`Running on port ${port}`));
        }
    }
    catch (error) {
        console.error('Unable to connect to the db:', error);
    }
});
startApp();
