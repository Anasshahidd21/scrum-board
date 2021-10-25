import app from "../app";
import request from "supertest";
import type { Server } from "http";
import User from "../database/model/user.model";
import { connectDB, disconnectDB } from "../database/service/dbService";
import mongoose from "mongoose";

const BASE_URL = "/api/v1/auth";

describe("authentication", () => {
  beforeAll(async () => {
    await connectDB();
    app;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should register as a new user", (done) => {
    const payload = {
      username: "test_username",
      password: "test_password",
    };
    const res = request(app)
      .post(`${BASE_URL}/signup`)
      .send(payload)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("should fail to login", (done) => {
    const payload = {
      username: "test_username",
      password: "incorrect_password",
    };
    const res = request(app)
      .post(`${BASE_URL}/login`)
      .send(payload)
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("should successfully login", (done) => {
    const payload = {
      username: "test_username",
      password: "test_password",
    };
    const res = request(app)
      .post(`${BASE_URL}/login`)
      .send(payload)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
