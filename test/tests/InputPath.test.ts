import {InputPath} from "../../src/inputPath/InputPath";
import {aroundCitadelPath1, mouaisRun, slalomingAroundLineRun} from "../features/runs";
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

        // https://gist.github.com/Alystrasz/5981756a43a5ed8f7bd1b4dd740922ce
        it ('should sort intersections by covered path distance', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);

            // first (red) random line intersections
            const firstIntersection = point([3.0718652531504627, 50.63595952881145]);
            const fourthIntersection = point([3.0721934884786606, 50.63584023349955]);
            const fifthIntersection = point([3.072478473186493, 50.63573688651399]);

            // second (blue) random line intersections
            const secondIntersection = point([3.0720503255724907, 50.63613049696586]);
            const thirdIntersection = point([3.0721187219023705, 50.63610923230391]);
            const sixthIntersection = point([3.072680979967117, 50.635934861712954]);


            // adding first line intersections at once
            inputPath.addIntersection(firstIntersection);
            inputPath.addIntersection(fourthIntersection);
            inputPath.addIntersection(fifthIntersection);

            // adding second line intersections at once
            inputPath.addIntersection(secondIntersection);
            inputPath.addIntersection(thirdIntersection);
            inputPath.addIntersection(sixthIntersection);


            // checking intersections order
            const intersections = inputPath.getIntersections();
            expect(intersections[0]).to.deep.equal(firstIntersection);
            expect(intersections[1]).to.deep.equal(secondIntersection);
            expect(intersections[2]).to.deep.equal(thirdIntersection);
            expect(intersections[3]).to.deep.equal(fourthIntersection);
            expect(intersections[4]).to.deep.equal(fifthIntersection);
            expect(intersections[5]).to.deep.equal(sixthIntersection);
        });

        // https://gist.github.com/Alystrasz/71eb5384b8f6e59fd1681c8a581a76e0
        it ('should sort intersections by distance with several intersection lines', () => {
            const inputPath = new InputPath(aroundCitadelPath1);

            const firstIntersection = point([3.0444902926683426, 50.644289250351655]);
            const secondIntersection = point([3.047403506934643, 50.64207848312234]);
            const thirdIntersection = point([3.041796013712883, 50.63959842195774]);

            // first line intersections
            inputPath.addIntersection(secondIntersection);

            // second line intersections
            inputPath.addIntersection(thirdIntersection);
            inputPath.addIntersection(firstIntersection);

            const intersections = inputPath.getIntersections();
            expect(intersections.length).to.equal(3);
            expect(intersections[0]).to.deep.equal(firstIntersection);
            expect(intersections[1]).to.deep.equal(secondIntersection);
            expect(intersections[2]).to.deep.equal(thirdIntersection);
        });

        it ('should sort intersections by distance when added in correct order', () => {
            const inputPath = new InputPath(aroundCitadelPath1);
            const firstIntersection = point([3.0444902926683426, 50.644289250351655]);
            const secondIntersection = point([3.047403506934643, 50.64207848312234]);
            const thirdIntersection = point([3.041796013712883, 50.63959842195774]);

            inputPath.addIntersection(firstIntersection);
            inputPath.addIntersection(secondIntersection);
            inputPath.addIntersection(thirdIntersection);

            const intersections = inputPath.getIntersections();
            expect(intersections.length).to.equal(3);
            expect(intersections[0]).to.deep.equal(firstIntersection);
            expect(intersections[1]).to.deep.equal(secondIntersection);
            expect(intersections[2]).to.deep.equal(thirdIntersection);
        });
    });
});
