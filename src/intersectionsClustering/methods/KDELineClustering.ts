import length from "@turf/length";
import lineSlice from "@turf/line-slice";
import {RandomLine} from "../../randomLine/RandomLine";
import {Feature, LineString, Point} from "@turf/helpers";
import along from "@turf/along";
const { mean } = require('d3-array');

export function KDELineClustering (
    line: RandomLine
): void {
    const lineIntersections = line.getIntersectionsList();
    const direction0intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 0);
    const direction1intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 1);

    const direction0distancesFromOrigin = direction0intersections.map((intersection) =>
        length(lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
    );
    const direction1distancesFromOrigin = direction1intersections.map((intersection) =>
        length(lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
    );

    // computing clusters
    const bandwidth = 40;
    const direction0clusters = _getDistanceClusters(
        kde(epanechnikov(bandwidth), thresholds(line), direction0distancesFromOrigin),
        line.path
    );
    const direction1clusters = _getDistanceClusters(
        kde(epanechnikov(bandwidth), thresholds(line), direction1distancesFromOrigin),
        line.path
    );

    // assigning associated clusters to intersections
    // first direction
    for (const cluster of direction0clusters) {
        let matchingIntersections = direction0intersections.filter((intersection) => {
            const intersectionDistanceToOrigin = length(
                lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
            return intersectionDistanceToOrigin >= cluster.minDistance
                && intersectionDistanceToOrigin <= cluster.maxDistance;
        });

        console.log(matchingIntersections.length);
        line.setClusteredIntersection(matchingIntersections, cluster.point);
    }

    // second direction
    for (const cluster of direction1clusters) {
        let matchingIntersections = direction1intersections.filter((intersection) => {
            const intersectionDistanceToOrigin = length(
                lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"})
            return intersectionDistanceToOrigin >= cluster.minDistance
                && intersectionDistanceToOrigin <= cluster.maxDistance;
        });

        console.log(matchingIntersections.length);
        line.setClusteredIntersection(matchingIntersections, cluster.point);
    }
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
    const stepCount = 10;
    const step = distance/stepCount;
    const thresholds: number[] = [];

    for (let i=0; i<=stepCount; i++) {
        thresholds.push( i*step );
    }

    return thresholds;
}


interface DistanceCluster {
    minDistance: number;
    maxDistance: number;
    point: Feature<Point>;
}

function _getDistanceClusters (
    kdeDensityArray: number[][],
    line: Feature<LineString>
): DistanceCluster[] {

    const clusters: DistanceCluster[] = [];
    let currentMinDistance = 0;
    let currentMaxDistance = 0;

    for (const entry of kdeDensityArray) {
        const distanceToOrigin = entry[0];
        const value = entry[1];

        if (value !== 0) {
            if (currentMinDistance === 0)
                currentMinDistance = distanceToOrigin;
            else
                currentMaxDistance = distanceToOrigin;
        }

        else {
            if (currentMinDistance !== 0) {
                clusters.push({
                    minDistance: currentMinDistance,
                    maxDistance: currentMaxDistance,
                    point: along(line, (currentMinDistance+currentMaxDistance)/2, {units: "meters"})
                });
                currentMinDistance = 0;
                currentMaxDistance = 0;
            }
        }
    }

    return clusters;
}
