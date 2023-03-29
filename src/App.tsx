import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProgressContextProvider from "./contexts/ProgressContext";

function App() {
  return (
    <div>
      <ProgressContextProvider>
        <Navbar />
      </ProgressContextProvider>
    </div>
  );
}

export default App;
