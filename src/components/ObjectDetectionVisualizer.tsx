import React, { useLayoutEffect, useRef } from "react";
import { ObjectDetectionVisualizerProps } from "../models/ObjectDetectionVisualizerProps";
import {
  BoundingBoxStyles,
  BoundingBoxTextPosition,
} from "../models/ObjectDetectionVisualizerState";

const ObjectDetectionVisualizer: React.FC<ObjectDetectionVisualizerProps> = (
  props
) => {
  const { boundingBoxStyles: theme, annotations, image } = props;
  const colorTheme: BoundingBoxStyles = {
    boudingBoxFill: theme?.boudingBoxFill || "#6A66A3",
    boudingBoxStroke: theme?.boudingBoxStroke || "#302E4D",
    boundingBoxOpacity: theme?.boundingBoxOpacity || 0.2,
    boundingBoxTextColor: theme?.boundingBoxTextColor || "yellow",
    boundingBoxTextFont: theme?.boundingBoxTextFont || "18px Comic Sans MS",
    boundingBoxTextPosition:
      theme?.boundingBoxTextPosition || BoundingBoxTextPosition.TopLeft,
    disableFill: theme?.disableFill,
    disableStroke: theme?.disableStroke,
    disableText: theme?.disableText,
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useLayoutEffect(() => {
    let canvasContext = canvasRef.current!.getContext("2d");
    if (imgRef.current && canvasRef.current) {
      imgRef.current.onload = () => {
        const imgWidth = imgRef.current!.width;
        const imgHeight = imgRef.current!.height;
        canvasRef.current!.height = imgRef.current!.height;
        canvasRef.current!.width = imgRef.current!.width;

        canvasContext!.drawImage(imgRef.current!, 0, 0, imgHeight, imgWidth);

        imgRef.current?.parentElement?.removeChild(imgRef.current);

        annotations.forEach((anot) => {
          canvasContext!.fillStyle = colorTheme.boudingBoxFill!;
          canvasContext!.strokeStyle = colorTheme.boudingBoxStroke!;
          let { x, y, height, width } = anot.coordinates;
          x = x - width / 2;
          y = y - height / 2;
          if (!colorTheme.disableFill) {
            canvasContext?.rect(x, y, width, height);
            canvasContext!.globalAlpha = colorTheme.boundingBoxOpacity!;
            canvasContext?.fill();
          }
          if (!colorTheme.disableStroke) {
            canvasContext?.rect(x - 1, y - 1, width + 1, height + 1);
            canvasContext!.globalAlpha = 1;
            canvasContext?.stroke();
          }
          if (!colorTheme.disableText) {
            canvasContext!.font = colorTheme.boundingBoxTextFont!;
            const texWidth = canvasContext?.measureText(anot.label).width!;
            console.log(texWidth);
            canvasContext!.fillStyle = colorTheme.boundingBoxTextColor!;

            const textPosition = colorTheme.boundingBoxTextPosition;
            const textCoordinates =
              textPosition === 0
                ? { x, y }
                : textPosition === 1
                ? { x: x + width - texWidth, y }
                : textPosition === 2
                ? { x, y: y + height }
                : textPosition === 3
                ? { x: x + width - texWidth, y: y + height }
                : { x: x + width / 2 - texWidth / 2, y: y + height / 2 };

            canvasContext?.fillText(
              anot.label,
              textCoordinates.x,
              textCoordinates.y
            );
          }
        });
      };
    }
  });
  return (
    <>
      <img ref={imgRef} src={image} style={{ display: "none" }} />
      <canvas ref={canvasRef} />
    </>
  );
};

export default ObjectDetectionVisualizer;
