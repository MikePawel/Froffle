import React from "react";
import ContractReader from "~/components/ContractReader/ContractReader";
import { useAccount } from "wagmi";

export default function GetScore() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const formatted_address = address || "";
  return (
    <div>
      <h4>
        Your score is:
        <br />
        {ContractReader([formatted_address, "Test"])}
      </h4>
    </div>
  );
}
