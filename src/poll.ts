import { ethers } from "ethers";
import { abi } from "./abi/tokenAbi";

const contractAddress = "0xcDf91bf87b31035b15D0eFA43d03e86d80aeCD88";

const httpProvider = new ethers.JsonRpcProvider(
  "https://node.ghostnet.etherlink.com"
);
const contract = new ethers.Contract(contractAddress, abi, httpProvider);

let lastBlockChecked = 0;

async function pollForEvents() {
  const currentBlock = await httpProvider.getBlockNumber();

  if (lastBlockChecked === 0) {
    lastBlockChecked = currentBlock - 1;
  }

  const eventFilter = contract.filters.RoleGranted();

  const events = await contract.queryFilter(
    eventFilter,
    lastBlockChecked + 1,
    currentBlock
  );

  events.forEach((event) => {
    console.log("New event found:", event);

    // call webhook
  });

  lastBlockChecked = currentBlock;
}

// Start polling every few seconds
setInterval(pollForEvents, 10000); // Poll every 10 seconds (adjust as needed)
