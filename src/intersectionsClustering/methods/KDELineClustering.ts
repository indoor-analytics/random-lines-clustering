import length from "@turf/length";
import lineSlice from "@turf/line-slice";
import {RandomLine} from "../../randomLine/RandomLine";
const kde = require("science").stats.kde;

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

    const result1 = kde(5, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
    console.log(result1(direction1distancesFromOrigin, 5));
    process.exit(-1);
}
