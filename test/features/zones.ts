import {BBox, Feature, featureCollection, Polygon, polygon} from "@turf/helpers";
import bbox from "@turf/bbox";

export const actualFlandersRailway: Feature<Polygon> = polygon(
    [
        [
            [
                3.069530411938615,
                50.63414800559576
            ],
            [
                3.075490534145672,
                50.63414800559576
            ],
            [
                3.075490534145672,
                50.63755383406735
            ],
            [
                3.069530411938615,
                50.63755383406735
            ],
            [
                3.069530411938615,
                50.63414800559576
            ]
        ]
    ]
);

export const actualFlandersRailwayBbox: BBox = bbox(featureCollection(actualFlandersRailway));
