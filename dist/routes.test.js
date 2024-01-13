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
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
(0, globals_1.describe)("POST /cars", () => {
    globals_1.test.each([
        [{ brand: 'mers', name: 'one_amg', year: 2016, price: 100.67 }, 200,],
        [{ brand: 'mers', name: 'two_amg', year: 2017, price: '1000.67' }, 200],
        [{ brand: 'mers', name: 'three_amg', year: 2017 }, 400],
    ])('with (%p, %i)', (car, status, description) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/app/cars")
            .send(car);
        (0, globals_1.expect)(res.statusCode).toBe(status);
    }));
});
