// blocktime.js
require('dotenv').config();
const Web3 = require('web3');

// Uses Sepolia RPC when provided; falls back to local development RPC.
const web3 = new Web3(process.env.SEPOLIA_RPC_URL || 'http://127.0.0.1:8545');

async function getBlockTimes() {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log("Latest Block:", latestBlock);

    let timestamps = [];
    for (let i = latestBlock - 10; i <= latestBlock; i++) {
        let block = await web3.eth.getBlock(i);
        timestamps.push(block.timestamp);
    }

    console.log("Timestamps:", timestamps);

    // حساب Block Time
    let blockTimes = [];
    for (let i = 0; i < timestamps.length - 1; i++) {
        blockTimes.push(timestamps[i + 1] - timestamps[i]);
    }
    console.log("Block Times (seconds):", blockTimes);

    let avg = blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length;
    console.log("Average Block Time:", avg, "seconds");
}

getBlockTimes();