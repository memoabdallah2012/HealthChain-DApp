require("dotenv").config();
const fs = require("fs");
const { ethers } = require("ethers");

async function main() {
  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  let privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!rpcUrl || !privateKey) {
    throw new Error("Missing SEPOLIA_RPC_URL or DEPLOYER_PRIVATE_KEY in .env");
  }

  privateKey = privateKey.trim();
  if (!privateKey.startsWith("0x")) {
    privateKey = "0x" + privateKey;
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const network = await provider.getNetwork();
  const balance = await wallet.getBalance();

  console.log("Network:", network.name, network.chainId);
  console.log("Deployer:", wallet.address);
  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");

  if (balance.eq(0)) {
    throw new Error("Deployer wallet has 0 Sepolia ETH. Please fund it first.");
  }

  const artifact = JSON.parse(
    fs.readFileSync("./build/contracts/HealthInsurance.json", "utf8")
  );

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  console.log("Deploying HealthInsurance...");
  const contract = await factory.deploy();

  console.log("Transaction hash:", contract.deployTransaction.hash);
  await contract.deployed();

  console.log("Contract deployed successfully!");
  console.log("Contract address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
