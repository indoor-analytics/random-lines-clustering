import {RandomLine} from "../../src/randomLine/RandomLine";
import {slalomingAroundLineRun} from "../features/runs";
import { expect } from "chai";

describe ('RandomLine class', () => {
    it ('should have empty intersections list when created', () => {
        const line = new RandomLine(slalomingAroundLineRun);
        expect(line.intersections.length).to.equal(0);
    });
});
