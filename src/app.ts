import { ethers } from "ethers";
import { abi } from "./abi/tokenAbi";

const CONTRACT_ADDRESS = "0xcDf91bf87b31035b15D0eFA43d03e86d80aeCD88";

async function main() {
  const httpProvider = new ethers.JsonRpcProvider(
    "https://node.ghostnet.etherlink.com"
  );
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, httpProvider);
  contract.on("RoleGranted", (role, account, sender, event) => {
    console.log(event);
    console.log(`Approved ${account}.`);
  });
}

main();

//This approach will only work if the RPC url has enabled `eth_newFilter` function.
//Refer to polling solution in poll.ts if this is not available
