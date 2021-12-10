import React, { useLayoutEffect, useRef } from "react";
import { ObjectDetectionVisualizerProps } from "../models/ObjectDetectionVisualizerProps";
import {
  BoundingBoxStyles,
  TextPosition,
} from "../models/ObjectDetectionVisualizerState";

const ObjectDetectionVisualizer: React.FC<ObjectDetectionVisualizerProps> = (
  props
) => {
  const { boundingBoxStyles, annotations, image } = props;
  const styles: BoundingBoxStyles = {
    boudingBoxFill: boundingBoxStyles?.boudingBoxFill || "#6A66A3",
    boudingBoxStroke: boundingBoxStyles?.boudingBoxStroke || "#302E4D",
    boundingBoxOpacity: boundingBoxStyles?.boundingBoxOpacity || 0.2,
    boundingBoxTextColor: boundingBoxStyles?.boundingBoxTextColor || "yellow",
    boundingBoxTextFont:
      boundingBoxStyles?.boundingBoxTextFont || "18px Comic Sans MS",
    boundingBoxTextPosition:
      boundingBoxStyles?.boundingBoxTextPosition || TextPosition.TopLeft,
    disableFill: boundingBoxStyles?.disableFill,
    disableStroke: boundingBoxStyles?.disableStroke,
    disableLabel: boundingBoxStyles?.disableLabel,
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
          canvasContext!.fillStyle = styles.boudingBoxFill!;
          canvasContext!.strokeStyle = styles.boudingBoxStroke!;
          let { x, y, height, width } = anot.coordinates;
          x = x - width / 2;
          y = y - height / 2;
          if (!styles.disableFill) {
            canvasContext?.rect(x, y, width, height);
            canvasContext!.globalAlpha = styles.boundingBoxOpacity!;
            canvasContext?.fill();
          }
          if (!styles.disableStroke) {
            canvasContext?.rect(x - 1, y - 1, width + 1, height + 1);
            canvasContext!.globalAlpha = 1;
            canvasContext?.stroke();
          }
          if (!styles.disableLabel) {
            canvasContext!.font = styles.boundingBoxTextFont!;
            const texWidth = canvasContext?.measureText(anot.label).width!;
            console.log(texWidth);
            canvasContext!.fillStyle = styles.boundingBoxTextColor!;

            const textPosition = styles.boundingBoxTextPosition;
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
      <img ref={imgRef} src={image} style={{ display: "none" }} alt="" />
      <canvas ref={canvasRef} />
    </>
  );
};

export default ObjectDetectionVisualizer;
