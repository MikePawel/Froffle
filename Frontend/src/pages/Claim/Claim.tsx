import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const Claim: React.FC = () => {
  const account = useAccount();

  console.log("Connected account:", account.address);

  const claim = async () => {
    console.log("claim");
    const contractAddress = "0xdB11B05991d6F2c28412E2a4486C3b2286EC74D0"; // Update with your contract address

    var abi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "NotEligible",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "currentBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "calculatedFees",
            type: "uint256",
          },
        ],
        name: "NotEnoughBalanceForFees",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "currentBalance",
            type: "uint256",
          },
        ],
        name: "NotEnoughBalanceusdcForTransfer",
        type: "error",
      },
      {
        inputs: [],
        name: "NothingToWithdraw",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint64",
            name: "destinationChainSelector",
            type: "uint64",
          },
        ],
        name: "transferusdcToSepolia",
        outputs: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "uint64",
            name: "destinationChainSelector",
            type: "uint64",
          },
          {
            indexed: false,
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "ccipFee",
            type: "uint256",
          },
        ],
        name: "usdcTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_beneficiary",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "addressToScore",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "allowanceusdc",
        outputs: [
          {
            internalType: "uint256",
            name: "usdcAmount",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balancesOf",
        outputs: [
          {
            internalType: "uint256",
            name: "linkBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "usdcBalance",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "eligibleAdd",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

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
