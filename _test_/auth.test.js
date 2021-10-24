import fetch from 'node-fetch';

describe("User signs up", () => {

    test("should respond with a 200 status code - Signup", async () => {
        const body = {
            username: "anas",
            password: "test"
        }
        const response = await fetch('http://localhost:3000/api/v1/auth/signup', 
        {method: 'POST',
         body: JSON.stringify(body)
        });
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a 500 status code", async () => {
        const body = {
            username: "anas",
            password: "test"
        }
        const response = await fetch('http://localhost:3000/api/v1/auth/signup', 
        {method: 'POST',
         body: JSON.stringify(body)
        });
        expect(response.statusCode).toBe(500)
    });

});

describe("User Logs in", () => {

    test("should respond with a 200 status code", async () => {
        const body = {
            username: "anas",
            password: "test"
        }
        const response = await fetch('http://localhost:3000/api/v1/auth/login', 
        {method: 'POST',
         body: JSON.stringify(body)
        });
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a 500 status code", async () => {
        const body = {
            username: "anas2",
            password: "test"
        }
        const response = await fetch('http://localhost:3000/api/v1/auth/login', 
        {method: 'POST',
         body: JSON.stringify(body)
        });
        expect(response.statusCode).toBe(500)
    });

});