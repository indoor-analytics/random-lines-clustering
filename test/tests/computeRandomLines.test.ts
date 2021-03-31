import { expect } from "chai";
import {computeRandomLines} from "../../src/randomLines/computeRandomLines";
import {COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS} from "../../src/randomLines/ComputeRandomLinesOptions";
import {actualFlandersRailway} from "../features/zones";
import {Feature, featureCollection, LineString} from "@turf/helpers";
import {polygonToLine} from "@turf/polygon-to-line";
import pointToLineDistance from "@turf/point-to-line-distance";
import {printCollectionToFile} from "../utils/printGeoJSONtoFile";

describe ('computeRandomLines', () => {
    it ('should compute lines which contain two positions each', () => {
        const lines = computeRandomLines(actualFlandersRailway);
        for (const line of lines)
            expect(line.geometry.coordinates.length).to.equal(2);
    });

    it ('should compute lines whose coordinates belong to area perimeter', () => {
        const lines = computeRandomLines(actualFlandersRailway);
        const perimeter = polygonToLine(actualFlandersRailway) as Feature<LineString>;

        for (const line of lines) {
            const p1DistanceToPerimeter = pointToLineDistance(line.geometry.coordinates[0], perimeter);
            expect(p1DistanceToPerimeter).to.be.approximately(0, 0.00001);
            const p2DistanceToPerimeter = pointToLineDistance(line.geometry.coordinates[1], perimeter);
            expect(p2DistanceToPerimeter).to.be.approximately(0, 0.00001);
        }
    });
});

describe ('computeRandomLines options companion object', () => {
    it ('should produce as many lines as default option', () => {
        const lines = computeRandomLines(actualFlandersRailway);
        expect(lines.length).to.equal(COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS.linesCount);
    });

    it ('should create one line', () => {
        const linesCount = 1;
        const lines = computeRandomLines(actualFlandersRailway, {linesCount});
        expect(lines.length).to.equal(linesCount);
        printCollectionToFile(featureCollection((lines)));
    });

    it ('should produce 42 lines', () => {
        const linesCount = 42;
        const lines = computeRandomLines(actualFlandersRailway, {linesCount});
        expect(lines.length).to.equal(linesCount);
    });

    it ('should compute 996 lines while providing seed', () => {
        const linesCount = 996;
        const lines = computeRandomLines(actualFlandersRailway, {linesCount, seedGenerator: () => 'hola'});
        expect(lines.length).to.equal(linesCount);
    });

    it ('should compute different lines with two method calls', () => {
        const lines1 = computeRandomLines(actualFlandersRailway);
        const lines2 = computeRandomLines(actualFlandersRailway);
        expect(lines1.length).to.equal(lines2.length);
        expect(lines1).to.not.deep.equal(lines2);
    });

    it ('should compute exact same lines with same seed', () => {
        const seedGenerator = () => 'this_is_a_random_seed';
        const lines1 = computeRandomLines(actualFlandersRailway, {seedGenerator});
        const lines2 = computeRandomLines(actualFlandersRailway, {seedGenerator});
        expect(lines1).to.deep.equal(lines2);
    });
});
