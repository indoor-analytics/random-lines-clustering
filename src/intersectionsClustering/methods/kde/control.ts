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

    let satisfied = false;
    let bandwidth = 0;

    while (!satisfied) {
        const clone = RandomLine.clone(line);
        kdeLineClusteringCore(clone, bandwidth);

        const intersections = clone.getIntersectionsList();
        satisfied = true;

        // clustering might fail with some bandwidth values
        try {
            for (const intersection of intersections) {
                const cluster = clone.getClusteredIntersection(intersection);
                if (cluster.properties!.weight < k) {
                    satisfied = false;
                    break;
                }
            }

        } catch (err) {
            satisfied = false;
        }

        // while k is not satisfied, increase bandwidth
        bandwidth += 1;
    }

    // TODO assign intersections to original random line
}
