import { Feature, LineString } from "@turf/helpers";
import { InputPath } from "../inputPath/InputPath";
import { IntersectionsMap } from "../intersectionsMap/IntersectionsMap";
export declare function buildClusteredPaths(inputPaths: InputPath[], intersectionsMap: IntersectionsMap): Feature<LineString>[];
