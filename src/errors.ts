import { validationResult, FieldValidationError } from 'express-validator';
import express from 'express';

const handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req).formatWith(error => {
        if (error.type === 'field') {
            error = error as FieldValidationError;
            return `${error.location}[${error.path}]: ${error.msg}`;
        }

        return `${error.type}: ${error.msg}`
    });

    if (!errors.isEmpty()) {
        let errorString = errors.array().reduce((acc, value) => acc + '\n' + value);
        throw { status: 400, description: errorString };
    }

    if (next)
        next();
};

const errorMiddleware = (err: { status: number, description: string  }, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(
        `Error ${(err.status || 'unknown error')} URL: ${req.method} ${req.path}
        \t\t\t\t\t message: ${JSON.stringify(err.description)} 
        \t\t\t\t\t body: ${JSON.stringify(req.body || {})}
        \t\t\t\t\t query: ${JSON.stringify(req.query || {})}`
    );

    err.status = err.status || 500;

    res.status(err.status).send(err);
}

export { handleValidationErrors, errorMiddleware }