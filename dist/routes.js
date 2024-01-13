"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const config_1 = __importDefault(require("config"));
const db = __importStar(require("./mini_db"));
const errors = __importStar(require("./errors"));
const router = (0, express_1.default)();
exports.router = router;
const sortValues = [-1, 1, 'asc', 'ascending', 'desc', 'descending'];
const basicAuthMiddleware = (0, express_basic_auth_1.default)({
    users: config_1.default.get("users"),
    challenge: true,
    unauthorizedResponse: 'Unauthorized',
});
router.get('/authorize', basicAuthMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Authorized');
}));
router.post('/cars', [
    (0, express_validator_1.body)('brand').isString(),
    (0, express_validator_1.body)('name').isString(),
    (0, express_validator_1.body)('year').isInt(),
    (0, express_validator_1.body)('price').isFloat(),
], errors.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = new db.Car(req.body);
        const savedCar = yield car.save();
        res.json(savedCar);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/cars', [
    (0, express_validator_1.body)('brand').isString(),
    (0, express_validator_1.body)('sortBy').optional().isObject(),
    (0, express_validator_1.body)('sortBy.year').optional().isIn(sortValues),
    (0, express_validator_1.body)('sortBy.price').optional().isIn(sortValues),
    (0, express_validator_1.body)('sortBy.name').optional().isIn(sortValues),
], errors.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield db.Car.find({ brand: req.body.brand }).sort(req.body.sortBy);
        res.json(cars);
    }
    catch (error) {
        next(error);
    }
}));
router.put('/cars/:id', [
    (0, express_validator_1.param)('id').isMongoId(),
    (0, express_validator_1.body)('brand').optional().isString(),
    (0, express_validator_1.body)('name').optional().isString(),
    (0, express_validator_1.body)('year').optional().isInt(),
    (0, express_validator_1.body)('price').optional().isFloat(),
], errors.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedCar = yield db.Car.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCar);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/cars/:id', [
    (0, express_validator_1.param)('id').isMongoId(),
], errors.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCar = yield db.Car.findByIdAndDelete(id);
        res.json({ deletedCar });
    }
    catch (error) {
        next(error);
    }
}));
