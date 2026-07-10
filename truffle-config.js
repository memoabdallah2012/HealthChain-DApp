require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    sepolia: {
      provider: () => {
        if (!PRIVATE_KEY || !SEPOLIA_RPC_URL) {
          throw new Error("Missing DEPLOYER_PRIVATE_KEY or SEPOLIA_RPC_URL in .env");
        }
        return new HDWalletProvider({
          privateKeys: [PRIVATE_KEY],
          providerOrUrl: SEPOLIA_RPC_URL,
        });
      },
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
