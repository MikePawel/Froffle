import { useReadContract } from "wagmi";
import { abi } from "./contractABI";

const contractAddress = "0x4F8757c55FCdf2Bc7834dF7134BFB0906cfFc35A";

function ContractReader(args: [string, string]) {
  const result = useReadContract({
    abi: abi,
    address: contractAddress,
    functionName: "retrieveData",
    args: args,
  });
  console.log("contract result:", result?.data);
  return <div>{result?.data?.toString()}</div>;
}

export default ContractReader;
