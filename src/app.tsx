import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { LoadingBarContainer } from "react-top-loading-bar";

import { RouteProgress } from "./components/route-progress";
import { Router as Routing } from "./router";

function App() {
  return (
    <LoadingBarContainer
      props={{
        color: "blue", // Use a bright Hex for better saturation
        height: 5, // 10 was actually quite thick; 4-5 is usually the "sweet spot"
        shadow: true, // Adds a glow effect under the bar
        waitingTime: 400, // Keeps it visible slightly longer after completion
      }}
    >
      <Router>
        <Routing />
        <RouteProgress />
        <Toaster />
      </Router>
    </LoadingBarContainer>
  );
}

export default App;
