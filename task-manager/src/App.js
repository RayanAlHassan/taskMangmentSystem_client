import "./App.css";
import AppRoute from "./routes/AppRoute";

function App() {
  const textStyle = {
    fontFamily: 'Swiss, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
  };

  return (
    <div className="App" style={textStyle}>

      <AppRoute />
    </div>
  );
}

export default App;
