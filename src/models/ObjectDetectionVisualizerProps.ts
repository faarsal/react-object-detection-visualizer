import { BoundingBoxStyles } from "./ObjectDetectionVisualizerState"

export type ObjectDetectionVisualizerProps={
    image:string;
    annotations:Annotation[];
    boundingBoxStyles?:BoundingBoxStyles;
}
type Annotation={
    label:string;
    coordinates:Coordinate;
}
type Coordinate={
    x:number;
    y:number;
    width:number;
    height:number;
}