import { expect } from "chai";
import {computeRandomLines} from "../../src/randomLines/computeRandomLines";
import {COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS} from "../../src/randomLines/ComputeRandomLinesOptions";
import {actualFlandersRailway} from "../features/zones";
import {Feature, LineString, point} from "@turf/helpers";
import {polygonToLine} from "@turf/polygon-to-line";
import booleanPointOnLine from "@turf/boolean-point-on-line";

describe ('computeRandomLines', () => {
    it ('should compute lines whose coordinates belong to area perimeter', () => {
        const lines = computeRandomLines(actualFlandersRailway);
        const perimeter = polygonToLine(actualFlandersRailway);

        for (const line of lines) {
            expect(booleanPointOnLine(point(line.geometry.coordinates[0]), perimeter as Feature<LineString>)).to.equal(true);
            expect(booleanPointOnLine(line.geometry.coordinates[1], perimeter as Feature<LineString>)).to.equal(true);
        }
    });

    it ('should fail', () => {
        expect(true).to.equal(false);
    });
});

describe ('computeRandomLines options companion object', () => {
    it ('should produce as many lines as default option', () => {
        const lines = computeRandomLines(actualFlandersRailway);
        expect(lines.length).to.equal(COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS.linesCount);
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
