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

        it ('should add several intersections', () => {
            const inputPath = new InputPath(mouaisRun);
            const firstIntersection = point([2.3717594146728516, 51.03615038969405]);
            const secondIntersection = point([2.377115786075592, 51.037699554861625]);
            const thirdIntersection = point([2.3662716150283813, 51.03802085046087]);
            inputPath.addIntersection(firstIntersection);
            inputPath.addIntersection(secondIntersection);
            inputPath.addIntersection(thirdIntersection);

            const intersections = inputPath.getIntersections();
            expect(intersections).to.include(firstIntersection);
            expect(intersections).to.include(secondIntersection);
            expect(intersections).to.include(thirdIntersection);
        });
    });
});
