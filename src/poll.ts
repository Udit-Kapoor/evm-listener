import { ethers, EventLog } from "ethers";
import { abi } from "./abi/tokenAbi";

const contractAddress = "0xbF777dfd6e26Cea381a8FD963011668001622C73";

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
    lastBlockChecked + 1, //11350860
    currentBlock ////11350870
  );

  events.forEach((event) => {
    console.log("New Event Found. Wallet Approved: ");
    const item = event as EventLog; // parse the event
    console.log(item.args[1]);

    // call webhook
  });

  lastBlockChecked = currentBlock;
}

// Start polling every few seconds
setInterval(pollForEvents, 10000); // Poll every 10 seconds (adjust as needed)

//Sample Response
// New event found: EventLog {
//   provider: JsonRpcProvider {},
//   transactionHash: '0x68ebe22b8199bd93114034662d00c16494ad5fa62ea8bebccfbf1647b0cbe525',
//   blockHash: '0x1692ebdc6422c41336ae45b3afd0a6175263f607469bb4d8302f638022a92415',
//   blockNumber: 11350866,
//   removed: false,
//   address: '0xcDf91bf87b31035b15D0eFA43d03e86d80aeCD88',
//   data: '0x',
//   topics: [
//     '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
//     '0xdb11624602202c396fa347735a55e345a3aeb3e60f8885e1a71f1bf8d5886db7',
//     '0x0000000000000000000000007e9411d26123f1dc745ac1c17fdd816a619ebfb2',
//     '0x000000000000000000000000e88bc62d1098c5d6320411037f0a13050dfa6212'
//   ],
//   index: 0,
//   transactionIndex: 0,
//   interface: Interface {
//     fragments: [
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [ErrorFragment],    [ErrorFragment],
//       [ErrorFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [EventFragment],    [EventFragment],
//       [EventFragment],    [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment], [FunctionFragment], [FunctionFragment],
//       [FunctionFragment]
//     ],
//     deploy: ConstructorFragment {
//       type: 'constructor',
//       inputs: [],
//       payable: false,
//       gas: null
//     },
//     fallback: null,
//     receive: false
//   },
//   fragment: EventFragment {
//     type: 'event',
//     inputs: [ [ParamType], [ParamType], [ParamType] ],
//     name: 'RoleGranted',
//     anonymous: false
//   },
//   args: Result(3) [
//     '0xdb11624602202c396fa347735a55e345a3aeb3e60f8885e1a71f1bf8d5886db7',
//     '0x7E9411D26123f1dC745ac1C17fDD816a619ebfb2',
//     '0xE88BC62D1098c5d6320411037f0a13050DfA6212'
//   ]
// }
