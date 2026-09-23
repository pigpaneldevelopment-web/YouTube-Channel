import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SeatingChart from "./SeatingChart.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SeatingChart />
  </StrictMode>
);
