import length from "@turf/length";
import lineSlice from "@turf/line-slice";
import {RandomLine} from "../../../randomLine/RandomLine";
import {Feature, LineString, Point} from "@turf/helpers";
import along from "@turf/along";
const { mean } = require('d3-array');

export function kdeLineClusteringCore (
    line: RandomLine,
    bandwidth: number
): void {
    const lineIntersections = line.getIntersectionsList();

    // assigning distances to origin to intersections
    lineIntersections.map((intersection) => {
        intersection.properties!.distanceToOrigin =
            length(lineSlice(line.path.geometry.coordinates[0], intersection, line.path), {units: "meters"});
    });
    let direction0intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 0);
    let direction1intersections = lineIntersections.filter((intersection) => intersection.properties!.direction === 1);


    // computing clusters
    const direction0 = {
        intersections: direction0intersections,
        clusters: _getDistanceClusters(
            kde(epanechnikov(bandwidth), thresholds(line), direction0intersections),
            line.path
        )
    };
    const direction1 = {
        intersections: direction1intersections,
        clusters: _getDistanceClusters(
            kde(epanechnikov(bandwidth), thresholds(line), direction1intersections),
            line.path
        )
    };


    // assigning associated clusters to intersections
    for (const direction of [direction0, direction1]) {
        for (const cluster of direction.clusters) {
            let matchingIntersections = direction.intersections.filter((intersection) => {
                const distanceToOrigin = intersection.properties!.distanceToOrigin;
                return distanceToOrigin >= cluster.minDistance
                    && distanceToOrigin <= cluster.maxDistance;
            });
            cluster.point.properties!.weight = matchingIntersections.length;
            line.setClusteredIntersection(matchingIntersections, cluster.point);
        }
    }
}


// https://observablehq.com/@d3/kernel-density-estimation

function kde (kernel: Function, thresholds: number[], data: Feature<Point>[]) {
    return thresholds.map(t => [t, mean(data, (d: Feature<Point>) => kernel(t - d.properties!.distanceToOrigin))]);
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
