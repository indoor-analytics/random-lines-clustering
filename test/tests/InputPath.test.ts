import {InputPath} from "../../src/inputPath/InputPath";
import {mouaisRun} from "../features/runs";
import { expect } from "chai";
import {point} from "@turf/helpers";

describe ('InputPath class', () => {
    describe ('intersections', () => {
        it ('should not have any intersection when created', () => {
            const inputPath = new InputPath(mouaisRun);
            expect(inputPath.getIntersections().length).to.equal(0);
        });

        it ('should add one intersection', () => {
            const inputPath = new InputPath(mouaisRun);
            const intersection = point([2.3785655200481415, 51.04015939117184]);
            inputPath.addIntersection(intersection);

            const intersections = inputPath.getIntersections();
            expect(intersections.length).to.equal(1);
            expect(intersections).to.include(intersection);
        });
    });
});
