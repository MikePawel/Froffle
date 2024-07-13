import React from "react";
import { getScore } from "~/components/ContractReader/ContractReader";
import { useAccount } from "wagmi";

export default function GetScore() {
  const contractResult = getScore("Test");

  return (
    <div>
      <h4>
        Your score is:
        <br />
        {contractResult?.data?.toString()}
      </h4>
    </div>
  );
}
