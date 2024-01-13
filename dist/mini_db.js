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
exports.Car = exports.connection = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
});
let connection = null;
exports.connection = connection;
const Car = mongoose_1.default.model('Car', carSchema);
exports.Car = Car;
const connect = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
        exports.connection = connection = mongoose_1.default.connection;
        mongoose_1.default.connection.on('error', err => {
            console.error('Db error: ', err);
        });
    }
    catch (error) {
        console.error('Error connecting to db: ', error);
        return false;
    }
    return true;
});
exports.connect = connect;
