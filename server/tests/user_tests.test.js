const apiRouter = require("../api");
const express = require("express");
const request = require("supertest");
const test_app = express();
test_app.use(express.json());
test_app.use(apiRouter);

// Mocking user_functions and server_functions modules
jest.mock("../../database/schema_functions/user_functions", () => ({
    retrieveUser: jest.fn(),
}));
jest.mock("../server_functions", () => ({
    generateAccessToken: jest.fn(),
    authenticateToken: jest.fn(),
}));

/**
 * Test case for user login functionality
 */
describe("Log In Post", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Should return a successful login
     */
    it("Should return a successful login", async () => {
        // Mock login data
        const loginData = {
            email: "admin@admin.admin",
            password: "admin",
        };

        // Mock user data
        const userData = {
            _id: "6613b185fcbcd304246263db",
            email: "admin@admin.admin",
            password:
                "$2a$10$hNS0JvsPvNoh48s31JkBCOZ/bIhAJjs42eGmwV9LWFjDWF2ndnBJy",
            name: "Admin",
            balance: 0,
            admin: true,
            __v: 0,
        };

        // Mock the behavior of the retrieveUser method
        require("../../database/schema_functions/user_functions").retrieveUser.mockResolvedValue(
            { result: true, data: userData, error: null }
        );

        // Mock the behavior of generateAccessToken method
        require("../server_functions").generateAccessToken.mockResolvedValue(
            "testing token data"
        );

        // Mock the behavior of authenticateToken method
        require("../server_functions").authenticateToken.mockResolvedValue(
            true
        );

        // Send a login request
        const result = await request(test_app).post("/login").send(loginData);


        // Assertions
        expect(result.body.result).toBe(true);
        expect(result.body.accessToken).toBe("testing token data");
    });
});
