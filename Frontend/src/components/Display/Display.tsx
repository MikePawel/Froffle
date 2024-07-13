import styles from "./Display.module.css";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

export const Display = () => {
  return (
    <div className="Display">
      <li>
        <Link to="/test">Go to testpage</Link>
      </li>
      <li>
        <Link to="/achievements">Go to achievements page</Link>
      </li>
      <li>
        <Link to="/getScore">Go to getScore page</Link>
      </li>
    </div>
  );
};
