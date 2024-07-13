import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { abi } from "./abi";
import style from "./Claim.module.css";

const Claim: React.FC = () => {
  const account = useAccount();

  console.log("Connected account:", account.address);

  const claim = async () => {
    console.log("claim");
    const contractAddress = "0xa50B037C7F3b91626A31aB9D72297db44171B42e"; // Update with your contract address

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

    const messageElement = document.getElementById(
      "message"
    ) as HTMLSelectElement;

    const selectedNetworkValue = selectedNetworkElement?.value;
    console.log("Selected :", messageElement);

    if (!selectedNetworkValue) {
      alert("Please select a network");
      return;
    }

    try {
      const tx = await subContract.transferusdcToSepolia(selectedNetworkValue);
      console.log(tx);
      messageElement.textContent = "Claim successful";
      messageElement.style.color = "green";
      messageElement.style.display = "block"; // Show the message
    } catch (error: any) {
      console.error("Error:", (error as Error).message);
      if ((error as Error).message.includes("Not eligible to claim")) {
        messageElement.textContent = "Not eligible to claim.";
      } else {
        messageElement.textContent = "An error occurred.";
      }
      messageElement.style.color = "red";
      messageElement.style.display = "block"; // Show the message
    }
  };

  return (
    <div className={style.main_div}>
      <div>Select Airdrop Network</div>
      <select id="network-select">
        <option value="16015286601757825753">Sepolia testnet</option>
        <option value="3478487238524512106">Arbitrum Sepolia testnet</option>
        <option value="10344971235874465080">Base Sepolia testnet</option>
        <option value="5224473277236331295">Optimism Sepolia testnet</option>
      </select>
      <br />

      <button id="claim-button" onClick={claim}>
        Claim
      </button>
      <br />
      <div id="message"></div>
    </div>
  );
};

export default Claim;
