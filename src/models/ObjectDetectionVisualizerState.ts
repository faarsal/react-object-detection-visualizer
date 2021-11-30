export type BoundingBoxStyles={
    boudingBoxFill?:string;
    boudingBoxStroke?:string;
    boundingBoxOpacity?:number;
    boundingBoxTextColor?:string;
    boundingBoxTextFont?:string;
    boundingBoxTextPosition?:BoundingBoxTextPosition,
    disableText?:boolean;
    disableStroke?:boolean;
    disableFill?:boolean;    
}
export enum BoundingBoxTextPosition{
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight,
    Center
}