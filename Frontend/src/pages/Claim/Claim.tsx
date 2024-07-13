import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { abi } from "./abi";

const Claim: React.FC = () => {
  const account = useAccount();

  console.log("Connected account:", account.address);

  const claim = async () => {
    console.log("claim");
    const contractAddress = "0xdB11B05991d6F2c28412E2a4486C3b2286EC74D0"; // Update with your contract address

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []); // Requires MetaMask connection

    const signer = provider.getSigner();
    const subContract = new ethers.Contract(contractAddress, abi, signer);

    // Get the selected network value
    const selectedNetworkElement = document.getElementById(
      "network-select"
    ) as HTMLSelectElement;
    const selectedNetworkValue = selectedNetworkElement?.value;
    console.log("Selected Network Value:", selectedNetworkValue);

    if (!selectedNetworkValue) {
      alert("Please select a network");
      return;
    }

    try {
      const tx = await subContract.transferusdcToSepolia(selectedNetworkValue);
      console.log("Mint transaction: ", tx);
    } catch (error: any) {
      console.error("Transaction error: ", error);
      console.log("Error data:", error.data);
    }
  };

  return (
    <div>
      <select id="network-select">
        <option value="16015286601757825753">Sepolia testnet</option>
        <option value="3478487238524512106">Arbitrum Sepolia testnet</option>
        <option value="10344971235874465080">Base Sepolia testnet</option>
        <option value="5224473277236331295">Optimism Sepolia testnet</option>
      </select>

      <button id="claim-button" onClick={claim}>
        Claim
      </button>
    </div>
  );
};

export default Claim;
