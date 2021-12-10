import ObjectDetectionVisualizer from "object-detection-visualizer";
import data from "./assets/flowers.json";

function App() {
  return (
    <div>
      {data.map((d) => (
        <ObjectDetectionVisualizer
          annotations={d.annotations}
          image={`/train/${d.image}`}
          boundingBoxStyles={{
            boundingBoxOpacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default App;
