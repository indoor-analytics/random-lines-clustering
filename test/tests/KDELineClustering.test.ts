import {InputPath} from "../../src/inputPath/InputPath";
import {slalomingAroundLineRun} from "../features/runs";
import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {RandomLine} from "../../src/randomLine/RandomLine";
import {randomLine1} from "../features/lines";
import {KDELineClustering} from "../../src/intersectionsClustering/KDELineClustering";
import { expect } from "chai";


describe ('KDE line clustering', () => {
    // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
    it ('should populate random line with clustered intersections', () => {
        const inputPath = new InputPath(slalomingAroundLineRun);
        const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

        // using first line (same line will appear three times)
        const firstLine = intersectionsMap.getAllIntersectionLines()[0];
        const firstIntersection = firstLine.getIntersectionsList()[0];

        KDELineClustering(firstLine);
        const clusteredIntersection = firstLine.getClusteredIntersection(firstIntersection);
        expect(clusteredIntersection).not.to.equal(undefined);
    });
});
