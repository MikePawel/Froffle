// ContractReader.tsx
import { useReadContract, useWriteContract } from "wagmi";
import { abi } from "./contractABI";
import { useAccount } from "wagmi";

const contractAddress = "0x4F8757c55FCdf2Bc7834dF7134BFB0906cfFc35A";

export function getScore(content: string) {
  const { address } = useAccount();

  const formatted_address = address || "0x";

  const result = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "retrieveData",
    args: [formatted_address, content],
  });
  return result;
}
