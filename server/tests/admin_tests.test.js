const adminRouter = require("../post/admin_post");
const express = require('express');
const request = require("supertest");

const test_app = express();
test_app.use(express.json());
test_app.use(adminRouter);

// Mocking the registerCourt function from court_functions module
jest.mock("../../database/schema_functions/court_functions", () => ({
    registerCourt: jest.fn(),
}));

/**
 * Test case for the registerCourt function
 */
describe("Register Court Post", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Should register a new court
     */
    it("Should register a new court", async () => {
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

        // Mock the behavior of the registerCourt method
        require("../../database/schema_functions/court_functions").registerCourt.mockResolvedValue(
            { result: true, data: null, error: null }
        );

        // Call the registerCourt function
        const result = await request(test_app)
            .post('/registerCourt')
            .send(courtData);

        // Assertions
        expect(result.body.result).toBe(true);
        expect(result.body.data).toBe(null);
        expect(result.body.error).toBe(null);
    });
});
