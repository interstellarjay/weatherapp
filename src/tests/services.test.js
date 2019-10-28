import {
    calculateBGColor,
    fetchData,
    getTestAPIPath,
} from "../services/services";

describe("Functional tests", () => {
    test("Successful connection to API", async () => {
        let degrees = 10;
        let expected = "rgb(255, 140, 0)";
        const req = await fetchData(getTestAPIPath(), {})
        expect(req.status).toBeLessThan(400);
    });
    test("Colors are calculated correctly for 10 degrees", () => {
        let degrees = 10;
        let expected = "rgb(255, 246, 0)";
        const result = calculateBGColor(10);
        expect(result).toEqual(expected);
    });
    test("Colors are calculated correctly for 30 degrees", () => {
        let degrees = 30;
        let expected = "rgb(255, 140, 0)";
        const result = calculateBGColor(30);
        expect(result).toEqual(expected);
    });
    test("Colors are calculated correctly for -10 degrees", () => {
        let degrees = -10;
        let expected = "rgb(0, 255, 255)";
        const result = calculateBGColor(-10);
        expect(result).toEqual(expected);
    });
});