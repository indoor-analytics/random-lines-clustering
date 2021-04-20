import length from "@turf/length";
import lineSlice from "@turf/line-slice";
import {RandomLine} from "../../randomLine/RandomLine";
const { mean } = require('d3-array');

export function KDELineClustering (
    line: RandomLine
): void {
    // TODO implement KDE clustering
    const lineIntersections = line.getIntersectionsList();
    const direction0intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 0);
    const direction1intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 1);

    const direction0distancesFromOrigin = direction0intersections.map((intersection) =>
        length(lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
    );
    const direction1distancesFromOrigin = direction1intersections.map((intersection) =>
        length(lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
    );

    const bandwidth = 7;
    const density0 = kde(epanechnikov(bandwidth), thresholds(line), direction0distancesFromOrigin);
    console.log(density0);

    const density1 = kde(epanechnikov(bandwidth), thresholds(line), direction1distancesFromOrigin);
    console.log(density1);

    process.exit(42);
}


// https://observablehq.com/@d3/kernel-density-estimation

function kde (kernel: Function, thresholds: number[], data: number[]) {
    return thresholds.map(t => [t, mean(data, (d: number) => kernel(t - d))]);
}

function epanechnikov (bandwidth: number): (x: number) => number {
    return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function thresholds (line: RandomLine): number[] {
    const distance = length(line.path, {units: "meters"});
    const stepCount = 100;
    const step = distance/stepCount;
    const thresholds: number[] = [];

    for (let i=0; i<=stepCount; i++) {
        thresholds.push( i*step );
    }

    return thresholds;
}
