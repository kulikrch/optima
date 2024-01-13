import express from 'express';
import { body, param } from 'express-validator';
import basicAuth from 'express-basic-auth';
import config from 'config';

import * as db from './mini_db';
import * as errors from './errors';

const router = express();
const sortValues = [-1, 1, 'asc', 'ascending', 'desc', 'descending'];

const basicAuthMiddleware = basicAuth({
  users: config.get("users"),
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
});

router.get('/authorize', basicAuthMiddleware, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('Authorized');
});

router.post('/cars', [
  body('brand').isString(),
  body('name').isString(),
  body('year').isInt(),
  body('price').isFloat(),
], errors.handleValidationErrors, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const car = new db.Car(req.body);
    const savedCar = await car.save();
    res.json(savedCar);
  } catch (error) {
    next(error);
  }
});

router.get('/cars', [
  body('brand').isString(),
  body('sortBy').optional().isObject(),
  body('sortBy.year').optional().isIn(sortValues),
  body('sortBy.price').optional().isIn(sortValues),
  body('sortBy.name').optional().isIn(sortValues),
], errors.handleValidationErrors, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const cars = await db.Car.find({ brand: req.body.brand }).sort(req.body.sortBy);
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.put('/cars/:id', [
  param('id').isMongoId(),
  body('brand').optional().isString(),
  body('name').optional().isString(),
  body('year').optional().isInt(),
  body('price').optional().isFloat(),
], errors.handleValidationErrors, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const updatedCar = await db.Car.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
});

router.delete('/cars/:id', [
  param('id').isMongoId(),
], errors.handleValidationErrors, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const deletedCar = await db.Car.findByIdAndDelete(id);
    res.json({ deletedCar });
  } catch (error) {
    next(error);
  }
});

export { router };