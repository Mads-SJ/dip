import { assert } from "chai";
import { find, filter, addPerson } from "../logic.js";

describe("find", () => {

    before(() => {
        addPerson("Mads", 25)
        addPerson("Hans", 45)
        addPerson("Ole", 45)
    });

    it("Should return object {name: Mads, age: 25 }", () => {
        const result = find("Mads");
        assert.equal(result.name, "Mads");
        assert.equal(result.age, 25);
    })

    it("Should return null when name is not found", () => {
        const result = find("ABCD");
        assert.isNull(result);
    })
})

describe("filter", () => {

    it("Should return a list of two persons (Hans and Ole) when filtering on age 45", () => {
        const result = filter(45);
        assert.equal(result.length, 2);
    })

    it("Should return an empty list when filtereing on age 10", () => {
        const result = filter(10);
        assert.equal(result.length, 0);
    })
})