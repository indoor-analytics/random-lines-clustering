import {getIntersectionDirection, getPathsIntersections} from "../../src/intersections/getPathsIntersections";
import {randomLine1} from "../features/lines";
import { expect } from "chai";
import {
   mouais2run,
   mouaisRun,
   straightBottomToTopRun,
   straightBottomToTopRun2,
   straightTopToBottomRun
} from "../features/runs";
import pointToLineDistance from "@turf/point-to-line-distance";
import lineIntersect from "@turf/line-intersect";

describe ('getPathsIntersections', () => {
   it ('should build intersection line', () => {
      const intersections = getPathsIntersections([mouaisRun, mouais2run], [randomLine1]);
      expect(intersections.length).to.equal(1);
      expect(intersections[0].line).to.deep.equal(randomLine1);
   });

   // https://gist.github.com/Alystrasz/62137f60b8c45eb7cfd102ab675a63bb
   it ('should build line with correct intersections', () => {
      const intersections = getPathsIntersections([mouaisRun, mouais2run], [randomLine1]);
      const intersectLine = intersections[0];

      expect(intersectLine.intersections.length).to.equal(6);

      for (const intersection of intersectLine.intersections)
         expect(pointToLineDistance(intersection, intersectLine.line)).to.be.approximately(0, 0.000000001);
   })
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
