// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const replace_contractAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const replace_contractFactory = await hre.ethers.getContractFactory("viinnsmoker");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  // Send a shielded transaction to execute a transaction in the contract
  const replace_functionName = "transfer";
  const replace_functionArgs = ["0x177Aca1b3cE65D64E2C19AbD3b975eAA206dC9f7", "100"];
  const transaction = await sendShieldedTransaction(signer, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);

  await transaction.wait();

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", transaction);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});