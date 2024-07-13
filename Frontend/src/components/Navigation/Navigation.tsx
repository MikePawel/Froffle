import { formatAddress } from "~/utils";
import styles from "./Navigation.module.css";
import { useAccount } from "wagmi";

export const Navigation = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>Froffle</div>
        <div className={styles.rightNav}></div>
        <w3m-button />
      </div>
    </div>
  );
};
