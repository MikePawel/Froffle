import "./App.global.css";
import styles from "./App.module.css";

import { Navigation } from "./components/Navigation";
import { Display } from "./components/Display";
import { Routes, Route } from "react-router-dom";
import Test from "./pages/Test/Test";
import Achievements from './pages/Achievements/Achievements'

export const App = () => {
  return (
    <div className={styles.appContainer}>
      <Navigation />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Display />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </div>
  );
};