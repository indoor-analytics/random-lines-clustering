import {InputPath} from "../../src/inputPath/InputPath";
import {mouaisRun} from "../features/runs";
import { expect } from "chai";

describe ('InputPath class', () => {
    describe ('intersections', () => {
        it ('should not have any intersection when created', () => {
            const inputPath = new InputPath(mouaisRun);
            expect(inputPath.getIntersections().length).to.equal(0);
        });
    });
});
