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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const serverUrl = `${config_1.default.get("host")}/app/`;
function sendRequest(command, method, dataStr, param = '', Authorization = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(dataStr.replace(/\\/g, '"'));
        yield axios_1.default.request({
            url: `${serverUrl}${command}${param ? `/${param}` : ''}`,
            method,
            data,
            headers: {
                Authorization
            }
        })
            .then(res => {
            console.log(res.data);
        })
            .catch((e) => {
            var _a, _b;
            console.log('Error:', e.message, '\n', (_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {});
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [command, ...params] = process.argv.slice(2);
        switch (command) {
            case 'create':
                yield sendRequest('cars', 'post', params[0]);
                break;
            case 'get':
                yield sendRequest('cars', 'get', params[0]);
                break;
            case 'update':
                yield sendRequest('cars', 'put', params[0], params[1]);
                break;
            case 'delete':
                yield sendRequest('cars', 'delete', '{}', params[0]);
                break;
            case 'authorize':
                yield sendRequest('authorize', 'get', '{}', '', `Basic ${Buffer.from(params[0]).toString('base64')}`);
                break;
            default:
                console.error('Invalid command. Use "get", "create", "update", "delete".');
        }
    });
}
main();
