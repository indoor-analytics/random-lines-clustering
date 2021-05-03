import { RandomLine } from "../../../randomLine/RandomLine";
/**
 * Regroups intersections on a random line via kernel-density estimation.
 * This tries applying KDE with different bandwidth values until k value is satisfied.
 *
 * @param line intersections container
 * @param k minimum count of intersections per cluster
 */
export declare function kdeLineClustering(line: RandomLine, k: number): void;
