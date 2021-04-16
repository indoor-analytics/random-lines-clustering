import {aroundCitadelPath1, aroundCitadelPath2} from "../features/runs";
import {InputPath} from "../../src/inputPath/InputPath";
import {RandomLine} from "../../src/randomLine/RandomLine";
import {citadelRandomLine1, citadelRandomLine2} from "../features/lines";
import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {clusterIntersections} from "../../src/intersectionsClustering/clusterIntersections";
import {CentroidLineClustering} from "../../src/intersectionsClustering/methods/CentroidLineClustering";
import {buildClusteredPaths} from "../../src/buildClusteredPaths/buildClusteredPaths";
import { expect } from "chai";

describe ('buildClusteredPaths', () => {
    // https://gist.github.com/Alystrasz/60fc1efee0689ddd8fbc9a97266a318f
    it ('should rebuild citadel average path', () => {
        const inputPaths = [new InputPath(aroundCitadelPath1), new InputPath(aroundCitadelPath2)];
        const randomLines = [new RandomLine(citadelRandomLine1), new RandomLine(citadelRandomLine2)];
        const clusteredIntersectionsMap = clusterIntersections(
            getPathsIntersections(inputPaths, randomLines),
            CentroidLineClustering
        );

        const paths = buildClusteredPaths(inputPaths, clusteredIntersectionsMap);
        expect(paths.length).to.equal(1);
        expect(paths[0].geometry.coordinates.length).to.equal(3);
    });
});
