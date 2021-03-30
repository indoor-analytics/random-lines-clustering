import { expect } from "chai";
import {computeRandomLines} from "../../src/randomLines/computeRandomLines";
import {COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS} from "../../src/randomLines/ComputeRandomLinesOptions";
import {actualFlandersRailwayBbox} from "../features/zones";

describe ('computeRandomLines', () => {
    it ('should fail', () => {
        expect(true).to.equal(false);
    });
});

describe ('computeRandomLines options companion object', () => {
    it ('should produce as many lines as default option', () => {
        const lines = computeRandomLines(actualFlandersRailwayBbox);
        expect(lines.length).to.equal(COMPUTE_RANDOM_LINES_OPTIONS_DEFAULTS.linesCount);
    });

    it ('should produce 42 lines', () => {
        const linesCount = 42;
        const lines = computeRandomLines(actualFlandersRailwayBbox, {linesCount});
        expect(lines.length).to.equal(linesCount);
    });

    it ('should compute 996 lines while providing seed', () => {
        const linesCount = 996;
        const lines = computeRandomLines(actualFlandersRailwayBbox, {linesCount, seed: 'hola'});
        expect(lines.length).to.equal(linesCount);
    });

    it ('should compute different lines with two method calls', () => {
        const lines1 = computeRandomLines(actualFlandersRailwayBbox);
        const lines2 = computeRandomLines(actualFlandersRailwayBbox);
        expect(lines1.length).to.equal(lines2.length);
        expect(lines1).to.not.deep.equal(lines2);
    });

    it ('should compute exact same lines with same seed', () => {
        const seed = 'this_is_a_random_seed';
        const lines1 = computeRandomLines(actualFlandersRailwayBbox, {seed});
        const lines2 = computeRandomLines(actualFlandersRailwayBbox, {seed});
        expect(lines1).to.deep.equal(lines2);
    });
});
