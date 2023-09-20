import { assert } from "chai";
import * as yatzy from "../model/yatzy.js";

describe("fullHousePoints", () => {

    it("Should return 28 when there is a full house with [5, 5, 6, 6, 6]", () => {
        yatzy.setValues([5, 5, 6, 6, 6]);
        const fullHousePoints = yatzy.fullHousePoints();
        assert.strictEqual(fullHousePoints, 28);
    })

    it("Should return 7 when there is a full house with [1, 1, 1, 2, 2]", () => {
        yatzy.setValues([1, 1, 1, 2, 2]);
        const fullHousePoints = yatzy.fullHousePoints();
        assert.strictEqual(fullHousePoints, 7);
    })

    it("Should return 0 when there is NOT a full house with [4, 5, 6, 6, 6]", () => {
        yatzy.setValues([4, 5, 6, 6, 6]);
        const fullHousePoints = yatzy.fullHousePoints();
        assert.strictEqual(fullHousePoints, 0);
    })

    it("Should return 0 when there is NOT a full house with [5, 6, 6, 6, 6]", () => {
        yatzy.setValues([5, 6, 6, 6, 6]);
        const fullHousePoints = yatzy.fullHousePoints();
        assert.strictEqual(fullHousePoints, 0);
    })

    it("Should return 0 when there is NOT a full house with [2, 2, 3, 4, 5]", () => {
        yatzy.setValues([2, 2, 3, 4, 5]);
        const fullHousePoints = yatzy.fullHousePoints();
        assert.strictEqual(fullHousePoints, 0);
    })
})

describe("smallStraightPoints", () => {

    it("Should return 15 when there is a small straight with [1, 2, 3, 4, 5]", () => {
        yatzy.setValues([1, 2, 3, 4, 5]);
        const fullHousePoints = yatzy.smallStraightPoints();
        assert.strictEqual(fullHousePoints, 15);
    })

    it("Should return 0 when there is NOT a small straight with [1, 2, 3, 4, 4]", () => {
        yatzy.setValues([1, 2, 3, 4, 4]);
        const fullHousePoints = yatzy.smallStraightPoints();
        assert.strictEqual(fullHousePoints, 0);
    })

    it("Should return 0 when there is NOT a small straight with [2, 2, 3, 4, 5]", () => {
        yatzy.setValues([2, 2, 3, 4, 5]);
        const fullHousePoints = yatzy.smallStraightPoints();
        assert.strictEqual(fullHousePoints, 0);
    })
})