import {InputPath} from "../../src/inputPath/InputPath";
import {aroundCitadelPath2, citadelTopToBottomPaths, slalomingAroundLineRun} from "../features/runs";
import {getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {RandomLine} from "../../src/randomLine/RandomLine";
import {citadelRandomLine1, randomLine1} from "../features/lines";
import { expect } from "chai";
import {KDELineClusteringCore} from "../../src/intersectionsClustering/methods/kde/KDELineClusteringCore";
import {CentroidLineClustering} from "../../src/intersectionsClustering/methods/CentroidLineClustering";


describe ('Clustering methods', () => {
    describe ('KDE line clustering', () => {
        // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
        it ('should populate random line with clustered intersections', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);
            const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

            // using first line (same line will appear three times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const firstIntersection = firstLine.getIntersectionsList()[0];

            KDELineClusteringCore(firstLine, 81);
            const clusteredIntersection = firstLine.getClusteredIntersection(firstIntersection);
            expect(clusteredIntersection).not.to.equal(undefined);
        });

        // https://gist.github.com/Alystrasz/a6b3599d5a16dafb5cd9f5648f0a3fdf
        it ('should populate random line with two clustered positions w/ four paths going in the same direction', () => {
            const inputPaths = citadelTopToBottomPaths.map((path) => new InputPath(path));
            const intersectionsMap = getPathsIntersections(inputPaths, [new RandomLine(citadelRandomLine1)]);

            // using first line (same line will appear four times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];
            const intersections = firstLine.getIntersectionsList();
            // because lines are conveniently sorted from left to right, intersections match lines
            const firstIntersection = intersections[0];
            const secondIntersection = intersections[1];
            const thirdIntersection = intersections[2];
            const fourthIntersection = intersections[3];

            KDELineClusteringCore(firstLine, 81);

            // first and second paths should point to one cluster
            // third and fourth paths should point to another
            const clusteredIntersection1 = firstLine.getClusteredIntersection(firstIntersection);
            const clusteredIntersection2 = firstLine.getClusteredIntersection(secondIntersection);
            const clusteredIntersection3 = firstLine.getClusteredIntersection(thirdIntersection);
            const clusteredIntersection4 = firstLine.getClusteredIntersection(fourthIntersection);

            expect(clusteredIntersection1).to.deep.equal(clusteredIntersection2);
            expect(clusteredIntersection3).to.deep.equal(clusteredIntersection4);
        });
    });


    describe ('Centroid line clustering', () => {
        // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
        it ('should populate random line with clustered intersections', () => {
            const inputPath = new InputPath(slalomingAroundLineRun);
            const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

            // using first line (same line will appear three times)
            const firstLine = intersectionsMap.getAllIntersectionLines()[0];

            const intersections = firstLine.getIntersectionsList();
            const firstIntersection = intersections[0];
            const secondIntersection = intersections[1];
            const thirdIntersection = intersections[2];

            CentroidLineClustering(firstLine);

            // first and third intersections should lead to the same clustered
            // location, as they both have the same direction
            const clusteredIntersection0 = firstLine.getClusteredIntersection(firstIntersection);
            const clusteredIntersection2 = firstLine.getClusteredIntersection(thirdIntersection);
            expect(clusteredIntersection0).to.deep.equal(clusteredIntersection2);

            // clustered location from second intersection should be different from other clustered location
            const clusteredIntersection1 = firstLine.getClusteredIntersection(secondIntersection);
            expect(clusteredIntersection1).to.not.equal(clusteredIntersection0);
        });

        // https://gist.github.com/Alystrasz/05b7aac14b49b28a8a4148f2d7d8e3cb
        it ('should feature only one intersection with one direction picked', () => {
            const inputPath = new InputPath(aroundCitadelPath2);
            const intersectionsMap = getPathsIntersections(
                [inputPath],
                [new RandomLine(citadelRandomLine1)]
            );

            // only one line
            const intersectionLine = intersectionsMap.getAllIntersectionLines()[0];
            const intersection = intersectionLine.getIntersectionsList()[0];

            CentroidLineClustering(intersectionLine);

            // since there is only one intersection, clustered intersection should have same position
            const clusteredIntersection = intersectionLine.getClusteredIntersection(intersection);
            expect(clusteredIntersection.geometry.coordinates).to.deep.equal(intersection.geometry.coordinates);
        });
    });
});
