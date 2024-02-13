import TimersPage from "./pages/timersPage/TimersPage";
import TimersContextProvider from "./store/Timers-context";
function App() {
  return (
    <TimersContextProvider>
      <TimersPage />
    </TimersContextProvider>
  );
}

export default App;
