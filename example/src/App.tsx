import ObjectDetectionVisualizer from "./components/ObjectDetectionVisualizer";
import data from "./assets/flowers.json";

function App() {
  return (
    <div>
      {data.map((d) => (
        <ObjectDetectionVisualizer
          annotations={d.annotations}
          image={`/train/${d.image}`}
        />
      ))}
    </div>
  );
}

export default App;
