import "./App.global.css";
import styles from "./App.module.css";

import { Navigation } from "./components/Navigation";
import { Display } from "./components/Display";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test/Test";
import Achievements from "./pages/Achievements/Achievements";
import GetScore from "./pages/GetScore/GetScore";
import Claim from "./pages/Claim/Claim";

export const App = () => {
  return (
    <div className={styles.appContainer}>
      <Navigation />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/display" element={<Display />} />
        <Route path="/getScore/" element={<GetScore />} />
        <Route path="/" element={<Achievements />} />
        <Route path="/claim" element={<Claim />}></Route>
      </Routes>
    </div>
  );
};
