/**
 * Styles for boundingBox
 */
export type BoundingBoxStyles={
    // Fill Color for the bounding box
    boudingBoxFill?:string;
    //Stoke color for the bounding box
    boudingBoxStroke?:string;
    //Opacity of the bounding box between 0 and 1
    boundingBoxOpacity?:number;
    //Color of the label text
    boundingBoxTextColor?:string;
    //Font of the label text
    boundingBoxTextFont?:string;
    //Positon of the Label Text Enum
    boundingBoxTextPosition?:TextPosition,
    //No label is displayed if this is false. Default True
    disableLabel?:boolean;
    //The bounding box has no stroke is displayed if this is false
    disableStroke?:boolean;
    //The bounding box has no fill is displayed if this is false
    disableFill?:boolean;    
}
export enum TextPosition{
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight,
    Center
}