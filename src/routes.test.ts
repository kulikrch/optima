import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';
import config from 'config';
import request from "supertest";

import app from "./app";

import * as db from './mini_db';

describe('CRUD Tests', () => {
  beforeAll(async () => {
    await db.connect(config.get("dbUrl"));
  });

  test('should create and delete a new car', async () => {
    const carData = { brand: 'Toyota', name: 'Camry', year: 2022, price: 25000 };
    const createdCar = new db.Car(carData);
    const savedCar = await createdCar.save();
    expect(savedCar).toHaveProperty('brand', 'Toyota');

    const deletedCar = await db.Car.findByIdAndDelete(savedCar._id);
    expect(deletedCar).toHaveProperty('_id', savedCar._id);
  });

  test('should get a list of cars', async () => {
    const cars = await db.Car.find();
    expect(cars).toBeInstanceOf(Array);
  });

  test('should update an existing car', async () => {
    const carData = { brand: 'Toyota', name: 'Camry_2', year: 2023, price: 29000 };
    const createdCar = new db.Car(carData);
    const savedCar = await createdCar.save();
    expect(savedCar).toHaveProperty('brand', 'Toyota');

    const updatedCar = await db.Car.findByIdAndUpdate(savedCar._id, { price: 26000 }, { new: true });
    expect(updatedCar).toHaveProperty('price', 26000);
  });
});

// describe("POST /cars", () => {
//   test.each([
//     [{ brand: 'mers', name: 'one_amg', year: 2016, price: 100.67 }, 200, undefined],
//     [{ brand: 'mers', name: 'two_amg', year: 2017, price: '1000.67' }, 200, undefined],
//     [{ brand: 'mers', name: 'three_amg', year: 2017 }, 400, "body[price]: Invalid value"],
//     [{ brand: 'mers', name: '4_amg' }, 400, "body[year]: Invalid value\nbody[price]: Invalid value"],
//   ])('with (%p, %i)', async (car, status, description) => {
//     const res = await request(app)
//       .post("/app/cars")
//       .send(car);

//     expect(res.statusCode).toBe(status);
//     expect(res.body.description).toBe(description);
//   });

// });

// describe("GET /cars", () => {
//   test.each([
//     ['mers', { year: 'asc', price: 1 }, 200],
//     ['mers', undefined, 200],
//     [null, { year: 'asc', price: -1 }, 400],
//   ])('with (%p)', async (brand, sortBy, status) => {
//     const res = await request(app)
//       .get("/app/cars")
//       .send({ brand, sortBy });

//     expect(res.statusCode).toBe(status);
//   });

// });