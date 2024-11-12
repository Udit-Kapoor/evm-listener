import { ethers } from "ethers";

const privateKey = "PRIVATE_KEY";
const recipientAddress = "0x5E85f9A3cfF2cc0BE5A922487793fba16174e91f";

const httpProvider = new ethers.JsonRpcProvider(
  "https://node.ghostnet.etherlink.com"
);
const wallet = new ethers.Wallet(privateKey, httpProvider);

async function sendXTZ() {
  try {
    const balance = await httpProvider.getBalance(recipientAddress);
    const amountInWei = "10000000000000000"; //0.01 XTZ

    const tx = {
      to: recipientAddress,
      value: amountInWei,
    };

    if (balance < BigInt("10000000000000000")) {
      const transactionResponse = await wallet.sendTransaction(tx);
      console.log("Transaction sent! Hash:", transactionResponse.hash);
      const receipt = await transactionResponse.wait();
      console.log("Transaction confirmed! Receipt:", receipt);
    } // 0.01XTZ
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

sendXTZ();
