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
    })
});
