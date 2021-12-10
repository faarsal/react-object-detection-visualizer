import { BoundingBoxStyles } from "./ObjectDetectionVisualizerState"


export type ObjectDetectionVisualizerProps={
    //URL of Image
    image:string;
    //Annotation in CreateML Format
    annotations:Annotation[];
    //Styles of boundingBox
    boundingBoxStyles?:BoundingBoxStyles;
}
/**
 *Coordinates and Label of the bounding box accoridng to the createML Annotation format
 */
type Annotation={
    label:string;
    coordinates:Coordinate;
}
/**
 * Coordinates of bounding box according to the createML Annotation format (x and y are coordinates of the center)
 */
type Coordinate={
    x:number;
    y:number;
    width:number;
    height:number;
}