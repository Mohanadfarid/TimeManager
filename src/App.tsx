import "./App.scss";
import Timer from "./components/timer/Timer";

function App() {
  return <>
  <Timer name="timer" hours={11} minutes={30} seconds={30}  />
  </>;
}

export default App;
