# @indoor-analytics/random-lines-clustering

Clusters a bunch of paths using random-picked lines.

## How to use

Add this line to `~/.npmrc` to set up the package registry:
```shell
@indoor-analytics:registry=https://npm.pkg.github.com/indoor-analytics
```

In your project, install the package:
```shell
npm i --save @indoor-analytics/random-lines-clustering
```

## Algorithm formalization

```text
Inputs:
    * a zone of interest (ZOI) on a single floor;
    * paths to cluster.

We create a bunch of straight lines, each line being defined by two ZOI random-picked points.

For each line:
    * MARK each intersection with a path (+ saving keeping intersection direction)
    * CLUSTER intersections (with k-nn or another algorithm)
    
For each path, we rebuild path using previously-clustered points:
    * if path segment between two points does not exist, create it
    * else increase its weight by one
```

## Marking intersections direction

```text
For each intersection:
    * get previous input path point (must not be on random-picked line)
    * get next input path point (must not be on random-picked line)
   
    * get associated sub-zones (random-picked line creates 2 sub-zones while cutting zone of interest)
    
    * if sub-zones are different (= path points are on both random line sides)
        * save firstZone/secondZone association tuple as direction
```
