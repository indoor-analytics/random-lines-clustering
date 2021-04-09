import {RandomLine} from "../randomLine/RandomLine";
import {Feature, Point} from "@turf/helpers";

/**
 * Links an intersection position to an intersections line.
 * As a random line can have several intersections with an input path, several intersections
 * (map keys) can lead to the same line.
 */
export class IntersectionsMap {
    private readonly _map: {[intersectionId: string]: RandomLine};

    constructor () {
        this._map = {};
    }

    public setLine (intersection: Feature<Point>, line: RandomLine): void {
        this._map[JSON.stringify(intersection)] = line;
    }

    public getLine (intersection: Feature<Point>): RandomLine {
        return this._map[JSON.stringify(intersection)];
    }

    public getKeys (): string[] {
        return Object.keys(this._map);
    }

    public getAllIntersectionLines (): RandomLine[] {
        return Object.values(this._map);
    }
}
