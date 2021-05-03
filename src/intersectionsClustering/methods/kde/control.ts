import {RandomLine} from "../../../randomLine/RandomLine";
import {kdeLineClusteringCore} from "./core";


/**
 * Regroups intersections on a random line via kernel-density estimation.
 * This tries applying KDE with different bandwidth values until k value is satisfied.
 *
 * @param line intersections container
 * @param k minimum count of intersections per cluster
 */
export function kdeLineClustering (
    line: RandomLine,
    k: number
): void {
    if (k === 0)
        throw new RangeError('k value must be higher than 0.');

    let satisfied = true;   // TODO set to false
    let bandwidth = 0;

    while (!satisfied) {
        const clone = new RandomLine(line.path);    // TODO properly clone line
        kdeLineClusteringCore(clone, bandwidth);

        // TODO get all line intersections
        // TODO check intersections weight

        // while k is not satisfied, increase bandwidth
        bandwidth += 1;
    }

    // assign intersections to original random line
    console.log(bandwidth);
}
