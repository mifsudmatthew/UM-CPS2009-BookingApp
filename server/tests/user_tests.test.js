const adminRouter = require("../post/admin_post");
const express = require('express');
const request = require("supertest");

const test_app = express();
test_app.use(express.json());
test_app.use(adminRouter);



jest.mock("../../database/schema_functions/user_functions", () => ({
    retrieveUser: jest.fn(), // Corrected from jn.fn() to jest.fn()
}));

// Test case for registerCourt function
describe("registerCourt function", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should register a new court", async () => {
        // Mock data for the new court
        const courtData = {
            name_new: "Test Court",
            price_new: 10,
            address_new: "Test Address",
            longitude_new: 123.456,
            latitude_new: 78.901,
            area_new: 100,
            type_new: "Indoor",
        };

        // Mock the behavior of the save method
        require("../../database/schema_functions/user_functions").retrieveUser.mockResolvedValue(
            { result: true, data: null, error: null }
        );

        // Call the registerCourt function
        const result = await request(test_app)
            .post('/registerCourt')
            .send(courtData);

		console.log(result.body);
        // Assertions
        expect(result.body.result).toBe(true);
        expect(result.body.data).toBe(null);
        expect(result.body.error).toBe(null);
    });
});