import styles from "./Display.module.css";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

export const Display = () => {
  return (
    <div className="Display">
      <Link to="/wlc">Go WalletConnect</Link>
      <Link to="/test">Go to testpage</Link>
    </div>
  );
};
