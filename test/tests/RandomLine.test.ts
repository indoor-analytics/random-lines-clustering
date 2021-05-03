import {RandomLine} from "../../src/randomLine/RandomLine";
import {slalomingAroundLineRun} from "../features/runs";
import { expect } from "chai";
import {Feature, LineString, point} from "@turf/helpers";
import pointToLineDistance from "@turf/point-to-line-distance";
import {CentroidLineClustering} from "../../src/intersectionsClustering/methods/CentroidLineClustering";

class TestLine extends RandomLine {
    constructor (line: Feature<LineString>) {
        super(line);
    }
    getCIntersections() {
        return this._clusteredIntersections;
    }
}

describe ('RandomLine class', () => {
    describe ('instantiation', () => {
        it ('should have empty intersections list when created', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            expect(line.getIntersectionsList().length).to.equal(0);
        });

        it ('should have empty clustered intersections map when created', () => {
            const line = new TestLine(slalomingAroundLineRun);
            expect(line.getCIntersections()).to.deep.equal({});
        });
    });


    describe ('get/set intersections', () => {
        it ('should set one intersection', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoint = point([3.072277307510376, 50.635539973727376]);
            line.addIntersections(linePoint);

            const lineIntersections = line.getIntersectionsList();
            expect(lineIntersections.length).to.equal(1);
            expect(lineIntersections[0]).to.deep.equal(linePoint);
        });

        it ('should set several intersections', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoints = [
                point([3.072277307510376, 50.635539973727376]),
                point([3.072100281715393, 50.63617621595648]),
                point([3.0738437175750732, 50.637071023341356])
            ];
            line.addIntersections(linePoints);

            const lineIntersections = line.getIntersectionsList();
            expect(lineIntersections).to.deep.equal(linePoints);
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

        it ('should throw error with point on line but not in intersections list', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoint = point([3.072277307510376, 50.635539973727376]);
            expect(pointToLineDistance(linePoint, slalomingAroundLineRun)).to.equal(0); // is a line point

            expect(line.getIntersectionsList().length).to.equal(0);
            expect(
                () => line.getClusteredIntersection(linePoint)
            ).to.throw(RangeError, 'Input point must be a random line intersection.');
        });

        it ("should throw error if no clustered point is mapped (= if the clustering algorithm hasn't been applied yet)", () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoint = point([3.072277307510376, 50.635539973727376]);
            line.addIntersections([linePoint]);

            expect(
                () => line.getClusteredIntersection(linePoint)
            ).to.throw(RangeError, 'Input point has no associated clustered position.');
        });

        it ('should retrieve associated intersection', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoint = point([3.072277307510376, 50.635539973727376]);
            line.addIntersections([linePoint]);
            const clusteredPoint = point([3.08443132164, 50.636254841615]);
            line.setClusteredIntersection([linePoint], clusteredPoint);

            const associatedClusteredPoint = line.getClusteredIntersection(linePoint);
            expect(associatedClusteredPoint).to.deep.equal(clusteredPoint);
        });
    });

    describe ('set clustered intersection', () => {
        it ('should associate several intersections to a same position', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoints = [
                point([3.072277307510376, 50.635539973727376]),
                point([3.072100281715393, 50.63617621595648]),
                point([3.0738437175750732, 50.637071023341356])
            ];
            line.addIntersections(linePoints);
            const clusteredPoint = point([3.08418432164, 50.64821612415]);

            line.setClusteredIntersection(linePoints, clusteredPoint);

            for (const linePoint of linePoints) {
                const associatedClusteredPoint = line.getClusteredIntersection(linePoint);
                expect(associatedClusteredPoint).to.deep.equal(clusteredPoint);
            }
        });
    });


    describe('clone', () => {
        it ('should clone line', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoints = [
                point([3.072277307510376, 50.635539973727376]),
                point([3.072100281715393, 50.63617621595648]),
                point([3.0738437175750732, 50.637071023341356])
            ];
            line.addIntersections(linePoints);

            const newLine = RandomLine.clone(line);
            expect(newLine.path).to.deep.equal(line.path);
            expect(newLine.getIntersectionsList()).to.deep.equal(linePoints);
        });

        it ('should not clone clustered intersections', () => {
            const line = new RandomLine(slalomingAroundLineRun);
            const linePoints = [
                point([3.072277307510376, 50.635539973727376]),
                point([3.072100281715393, 50.63617621595648]),
                point([3.0738437175750732, 50.637071023341356])
            ];
            line.addIntersections(linePoints);

            // manually associating clustered intersections
            const clusteredPoint = point([3.08418432164, 50.64821612415]);
            line.setClusteredIntersection(linePoints, clusteredPoint);

            const newLine = RandomLine.clone(line);
            expect(
                () => newLine.getClusteredIntersection(linePoints[0])
            )
                .to.throw(RangeError, 'Input point has no associated clustered position.')
        });
    });
});
