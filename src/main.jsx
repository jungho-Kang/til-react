import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pop from "./components/Pop";
import "./index.css";

// Page라는 이름이 붙어있다.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pop></Pop>
  </StrictMode>,
);
