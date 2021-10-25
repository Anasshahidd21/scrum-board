import app from "../app";
import request from "supertest";
import type { Server } from "http";
import User from "../database/model/user.model";
import { connectDB, disconnectDB } from "../database/service/dbService";
import mongoose from "mongoose";

const BASE_URL = "/api/v1/tasks";

describe.only("tasks", () => {
  beforeAll(async () => {
    await connectDB();
    app;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should not add a new task", (done) => {
    const payload = {
      task: {
        title: "Test Task",
        description: "This is a test task",
        state: "COMPLETE",
        creater: "anas2",
      },
    };

    // const bearer_token =
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.YW5hczI.ruCw9B2Io5tljS35KyEPQoNVnL9PnUVfT47rZ7fPZ6M";
    const res = request(app)
      .post(`${BASE_URL}/newTask`)
      .send(payload)
      //   .set("Authorization", bearer_token)
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("should add a new task", (done) => {
    const payload = {
      task: {
        title: "Test Task",
        description: "This is a test task",
        state: "COMPLETE",
      },
    };

    const bearer_token =
      "eyJhbGciOiJIUzI1NiJ9.YW5hczI.ruCw9B2Io5tljS35KyEPQoNVnL9PnUVfT47rZ7fPZ6M";
    const res = request(app)
      .post(`${BASE_URL}/newTask`)
      .send(payload)
      .set("Authorization", `Bearer ${bearer_token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
