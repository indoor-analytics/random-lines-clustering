import {RandomLine} from "../../src/randomLine/RandomLine";
import {slalomingAroundLineRun} from "../features/runs";
import { expect } from "chai";
import {point} from "@turf/helpers";

describe ('RandomLine class', () => {
    describe ('instantiation', () => {
        it ('should have empty intersections list when created', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            expect(line.intersections.length).to.equal(0);
        });

        it ('should have empty clustered intersections map when created', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            expect(line.clusteredIntersections).to.deep.equal({});
        });
    });

    describe('get clustered intersection', () => {
        it ('should throw error with point not on random line', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const outerPoint = point([50.636012, 3.073612]);
            expect(
                () => line.getClusteredIntersection(outerPoint)
            ).to.throw(RangeError, 'Input point must belong to random line.');
        });
    });
});
