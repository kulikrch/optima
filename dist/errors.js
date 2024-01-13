"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(error => {
        if (error.type === 'field') {
            error = error;
            return `${error.location}[${error.path}]: ${error.msg}`;
        }
        return `${error.type}: ${error.msg}`;
    });
    if (!errors.isEmpty()) {
        let errorString = errors.array().reduce((acc, value) => acc + '\n' + value);
        throw { status: 400, description: errorString };
    }
    if (next)
        next();
};
exports.handleValidationErrors = handleValidationErrors;
const errorMiddleware = (err, req, res, next) => {
    console.error(`Error ${(err.status || 'unknown error')} URL: ${req.method} ${req.path}
        \t\t\t\t\t message: ${JSON.stringify(err.description)} 
        \t\t\t\t\t body: ${JSON.stringify(req.body || {})}
        \t\t\t\t\t query: ${JSON.stringify(req.query || {})}`);
    err.status = err.status || 500;
    res.status(err.status).send(err);
};
exports.errorMiddleware = errorMiddleware;
