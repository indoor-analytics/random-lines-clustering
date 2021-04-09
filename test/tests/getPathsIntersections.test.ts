import {getIntersectionDirection, getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {randomLine1, randomLine2} from "../features/lines";
import { expect } from "chai";
import {
   mouais2run,
   mouaisRun, notCrossingLineRun, slalomingAroundLineRun,
   straightBottomToTopRun,
   straightBottomToTopRun2,
   straightTopToBottomRun
} from "../features/runs";
import pointToLineDistance from "@turf/point-to-line-distance";
import lineIntersect from "@turf/line-intersect";
import {InputPath} from "../../src/inputPath/InputPath";
import {RandomLine} from "../../src/randomLine/RandomLine";

describe ('getPathsIntersections', () => {
   it ('should build intersection line', () => {
      const intersectionsMap = getPathsIntersections([new InputPath(mouaisRun), new InputPath(mouais2run)], [new RandomLine(randomLine1)]);
      expect(intersectionsMap.getAllIntersectionLines().length).to.equal(6);
      expect(intersectionsMap.getAllIntersectionLines()[0].path).to.deep.equal(randomLine1);
   });

   // https://gist.github.com/Alystrasz/62137f60b8c45eb7cfd102ab675a63bb
   it ('should build line with correct intersections', () => {
      const intersectionsMap = getPathsIntersections([new InputPath(mouaisRun), new InputPath(mouais2run)], [new RandomLine(randomLine1)]);
      const allIntersectionLines = intersectionsMap.getAllIntersectionLines();
      const intersectLine = allIntersectionLines[0];

      expect(intersectLine.intersections.length).to.equal(6);

      for (const intersection of intersectLine.intersections)
         expect(pointToLineDistance(intersection, intersectLine.path)).to.be.approximately(0, 0.000000001);
   });

   // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
   it ("should populate input path's intersections", () => {
      const inputPath = new InputPath(slalomingAroundLineRun);
      expect(inputPath.getIntersections().length).to.equal(0);

      getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

      expect(inputPath.getIntersections().length).to.equal(3);
   });

   // https://gist.github.com/Alystrasz/6ea1c20b0605cc0b482903b76cd5d716
   it ('should build line intersecting random line several times', () => {
      const inputPath = new InputPath(slalomingAroundLineRun);
      const intersectionsMap = getPathsIntersections([inputPath], [new RandomLine(randomLine1)]);

      // checking if each intersection leads to the same intersections line
      const intersectLine = intersectionsMap.getLine(inputPath.getIntersections()[0]);
      for (const intersectionPoint of inputPath.getIntersections()) {
         expect(intersectionsMap.getLine(intersectionPoint)).to.deep.equal(intersectLine);
      }

      // checking directions
      const directionsMap: {[id: string]: number} = {};
      for (const intersection of intersectLine.intersections) {
         const direction = intersection.properties!.direction;
         if (!directionsMap[direction]) {
            directionsMap[direction] = 1;
         } else {
            directionsMap[direction] += 1;
         }
      }

      const directions: string[] = Object.keys(directionsMap);
      expect(directions.length).to.equal(2);
      if (directionsMap[directions[0]] === 1)
         expect(directionsMap[directions[1]]).to.equal(2);
      else {
         expect(directionsMap[directions[0]]).to.equal(2);
         expect(directionsMap[directions[1]]).to.equal(1);
      }
   });

   // https://gist.github.com/Alystrasz/d06ab9213e44534eced3ae23d461be85
   it ('should not get intersections for non-crossing paths', () => {
      const intersections = getPathsIntersections([new InputPath(notCrossingLineRun)], [new RandomLine(randomLine1)]);
      expect(intersections.getKeys().length).to.equal(0);
   });

   // https://gist.github.com/Alystrasz/1b7b28570df470c3bca899c3152b5b14
   it ('should return a map containing 6 intersections, referring to 2 random lines', () => {
      const intersectionsMap = getPathsIntersections(
          [new InputPath(slalomingAroundLineRun)],
          [new RandomLine(randomLine1), new RandomLine(randomLine2)]
      );
      expect(intersectionsMap.getKeys().length).to.equal(6);

      const values = intersectionsMap.getAllIntersectionLines()
          .map((line) => JSON.stringify(line));
      const uniqueValues = values.filter((item, index) => values.indexOf(item) === index);

      expect(uniqueValues.length).to.equal(2);
   });
});


describe ('getIntersectionDirection', () => {
   // https://gist.github.com/Alystrasz/207e3efbdb37d93e83d2309c93784304
   it ('should feature two intersections with two different directions', () => {
      const intersection1 = lineIntersect(straightBottomToTopRun, randomLine1).features[0];
      const direction1 = getIntersectionDirection(straightBottomToTopRun, randomLine1, intersection1);

      const intersection2 = lineIntersect(straightTopToBottomRun, randomLine1).features[0];
      const direction2 = getIntersectionDirection(straightTopToBottomRun, randomLine1, intersection2);

      expect(direction1).to.not.equal(direction2);
   });

   // https://gist.github.com/Alystrasz/8c7cee9622453e9ae8c78f1487c59620
   it ('should feature two intersections with same direction', () => {
      const intersection1 = lineIntersect(straightBottomToTopRun, randomLine1).features[0];
      const direction1 = getIntersectionDirection(straightBottomToTopRun, randomLine1, intersection1);

      const intersection2 = lineIntersect(straightBottomToTopRun2, randomLine1).features[0];
      const direction2 = getIntersectionDirection(straightBottomToTopRun2, randomLine1, intersection2);

      expect(direction1).to.equal(direction2);
   });
});
