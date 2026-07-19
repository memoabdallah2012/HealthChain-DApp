// --- 1. SET UP YOUR CONTRACT DETAILS ---
const contractAddress = "0xf5f91C8E6E7bd5f198244AE52121d8dE4a50908A"; // Replace after Sepolia deployment
const SEPOLIA_CHAIN_ID = 11155111;
const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "actorAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum HealthInsurance.Role",
          "name": "role",
          "type": "uint8"
        }
      ],
      "name": "ActorRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "providerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalCost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "coveredItems",
          "type": "string[]"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "uncoveredItems",
          "type": "string[]"
        }
      ],
      "name": "ItemsProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "planId",
          "type": "uint256"
        }
      ],
      "name": "PatientEnrolled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "planId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "planName",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "companyAddress",
          "type": "address"
        }
      ],
      "name": "PlanCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "providerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "serviceName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        }
      ],
      "name": "ServiceProvided",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "actors",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "enum HealthInsurance.Role",
          "name": "role",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "actorAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "patientEnrollments",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "planId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "currentBalance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isEnrolled",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "plans",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "planId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "planName",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "companyAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "coverageLimit",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "plansByCompany",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "predefinedServices",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "registeredActorAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "serviceCosts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "enum HealthInsurance.Role",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_planName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_coverageLimit",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "_servicesToCover",
          "type": "string[]"
        },
        {
          "internalType": "address[]",
          "name": "_excludedProviderAddresses",
          "type": "address[]"
        }
      ],
      "name": "createPlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_planId",
          "type": "uint256"
        }
      ],
      "name": "enrollInPlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_serviceName",
          "type": "string"
        }
      ],
      "name": "provideService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "_medicineNames",
          "type": "string[]"
        }
      ],
      "name": "provideMedicines",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "_serviceNames",
          "type": "string[]"
        }
      ],
      "name": "provideServices",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "getActorInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "enum HealthInsurance.Role",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_planId",
          "type": "uint256"
        }
      ],
      "name": "getPlanInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        }
      ],
      "name": "getPatientPlan",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_planId",
          "type": "uint256"
        }
      ],
      "name": "getPlanCoveredServices",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_itemName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_cost",
          "type": "uint256"
        }
      ],
      "name": "addPlatformItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllServices",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_companyAddress",
          "type": "address"
        }
      ],
      "name": "getCompanyPlans",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllActorAddresses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
];

// --- 2. GLOBAL VARIABLES & DOM ELEMENTS ---
let provider;
let signer;
let contract;

const notification = document.getElementById('notification');

// --- 3. EVENT LISTENERS ---
window.addEventListener('load', () => {
    // Page switching logic
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('registerButton').addEventListener('click', register);
    document.getElementById('logoutButton').addEventListener('click', logout);
    
    // Actor-specific actions
    document.getElementById('createPlanButton').addEventListener('click', createPlan);
    document.getElementById('provideServicesButton').addEventListener('click', provideServices);
    document.getElementById('provideMedicinesButton').addEventListener('click', provideMedicines);

    // **FIX**: Use event delegation for dynamically created "Enroll" buttons
    document.getElementById('allPlansList').addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('enroll-btn')) {
            const planId = event.target.dataset.planId;
            enrollInPlan(planId);
        }
    });

    document.getElementById('addServiceButton').addEventListener('click', addService);
    document.getElementById('listMyPlansButton').addEventListener('click', listCompanyPlans);
    document.getElementById('addMedicineButton').addEventListener('click', addMedicine);
    document.getElementById('addHospitalServiceButton').addEventListener('click', addHospitalService);


});

if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => logout());
    window.ethereum.on('chainChanged', () => window.location.reload());
}


// --- 4. CORE FUNCTIONS (Wallet Connection, Login, Register, Logout) ---
function isContractConfigured() {
    return contractAddress &&
        contractAddress !== "PASTE_YOUR_SEPOLIA_CONTRACT_ADDRESS_HERE" &&
        ethers.utils.isAddress(contractAddress);
}

async function switchToSepolia() {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (parseInt(currentChainId, 16) === SEPOLIA_CHAIN_ID) return;

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
        });
    } catch (switchError) {
        // 4902 means Sepolia is not added to the wallet yet.
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: SEPOLIA_CHAIN_ID_HEX,
                    chainName: 'Sepolia Test Network',
                    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
                    rpcUrls: ['https://rpc.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io'],
                }],
            });
        } else {
            throw switchError;
        }
    }
}

async function connectWallet() {
    if (!isContractConfigured()) {
        throw new Error("Please replace contractAddress in public/app.js with the Sepolia deployed contract address.");
    }
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask and try again.");
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    await switchToSepolia();

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    return await signer.getAddress();
}

async function getCurrentSignerAddress() {
    if (!signer) return sessionStorage.getItem('userAddress');
    return await signer.getAddress();
}


// --- SYSTEM EVALUATION MEASUREMENT HELPERS ---
// Stores real Sepolia transaction measurements locally in the browser.
// No smart-contract logic is changed by these helpers.
const EVALUATION_STORAGE_KEY = 'healthChainSepoliaEvaluationResults';

function getEvaluationResults() {
    try {
        return JSON.parse(localStorage.getItem(EVALUATION_STORAGE_KEY) || '[]');
    } catch (e) {
        console.warn('Could not read saved evaluation results:', e);
        return [];
    }
}

function saveEvaluationResult(result) {
    const results = getEvaluationResults();
    const runNumber = results.filter(r => r.Function === result.Function).length + 1;
    const savedResult = { Run: runNumber, ...result };
    results.push(savedResult);
    localStorage.setItem(EVALUATION_STORAGE_KEY, JSON.stringify(results));

    console.log(`[Evaluation] ${result.Function} - Run ${runNumber}`);
    console.table(savedResult);
    console.log(`[Evaluation] Total saved transactions: ${results.length}`);

    return savedResult;
}

async function buildEvaluationResult(functionName, tx, receipt, confirmationSeconds) {
    const gasUsed = receipt?.gasUsed || ethers.constants.Zero;

    // Ethers.js v5 normally exposes effectiveGasPrice on the receipt.
    // Fall back to tx.gasPrice or the transaction fetched from the provider.
    let effectiveGasPrice = receipt?.effectiveGasPrice || tx?.gasPrice || null;
    if (!effectiveGasPrice && provider && tx?.hash) {
        try {
            const networkTx = await provider.getTransaction(tx.hash);
            effectiveGasPrice = networkTx?.gasPrice || null;
        } catch (e) {
            console.warn('Could not fetch gas price for evaluation:', e);
        }
    }

    const transactionFeeWei = effectiveGasPrice
        ? gasUsed.mul(effectiveGasPrice)
        : null;

    let blockTimestampUTC = '';
    if (provider && receipt?.blockNumber) {
        try {
            const block = await provider.getBlock(receipt.blockNumber);
            if (block?.timestamp) {
                blockTimestampUTC = new Date(block.timestamp * 1000).toISOString();
            }
        } catch (e) {
            console.warn('Could not fetch block timestamp for evaluation:', e);
        }
    }

    let walletAddress = '';
    try {
        walletAddress = await getCurrentSignerAddress() || '';
    } catch (e) {
        console.warn('Could not read signer address for evaluation:', e);
    }

    return {
        Function: functionName,
        TransactionHash: receipt?.transactionHash || tx?.hash || '',
        BlockNumber: receipt?.blockNumber ?? '',
        Status: Number(receipt?.status) === 1 ? 'Success' : 'Failed',
        GasUsed: gasUsed.toString(),
        EffectiveGasPriceGwei: effectiveGasPrice
            ? ethers.utils.formatUnits(effectiveGasPrice, 'gwei')
            : '',
        TransactionFeeETH: transactionFeeWei
            ? ethers.utils.formatEther(transactionFeeWei)
            : '',
        ConfirmationTimeSeconds: Number(confirmationSeconds).toFixed(2),
        WalletAddress: walletAddress,
        BlockTimestampUTC: blockTimestampUTC
    };
}

/**
 * Measures a submitted blockchain transaction from the moment Ethers.js
 * returns the transaction response until the transaction receipt is confirmed.
 *
 * This intentionally excludes the time a user spends reviewing/confirming
 * the MetaMask popup, so the recorded value reflects blockchain confirmation
 * behavior rather than human interaction time.
 */
async function measureTransaction(functionName, tx) {
    const confirmationStart = performance.now();

    try {
        const receipt = await tx.wait();
        const confirmationSeconds = (performance.now() - confirmationStart) / 1000;

        const result = await buildEvaluationResult(
            functionName,
            tx,
            receipt,
            confirmationSeconds
        );
        saveEvaluationResult(result);

        return receipt;
    } catch (error) {
        const confirmationSeconds = (performance.now() - confirmationStart) / 1000;

        // If the transaction was mined but reverted, Ethers.js v5 may attach
        // the receipt to the thrown error. Record it as a failed on-chain tx.
        if (error?.receipt) {
            try {
                const failedResult = await buildEvaluationResult(
                    functionName,
                    tx,
                    error.receipt,
                    confirmationSeconds
                );
                failedResult.Status = 'Failed';
                saveEvaluationResult(failedResult);
            } catch (recordError) {
                console.error('Could not record failed evaluation transaction:', recordError);
            }
        }

        throw error;
    }
}

function showEvaluationResults() {
    const results = getEvaluationResults();
    console.table(results);
    return results;
}

function clearEvaluationResults() {
    localStorage.removeItem(EVALUATION_STORAGE_KEY);
    console.log('[Evaluation] Saved evaluation results cleared.');
}

function downloadEvaluationCSV() {
    const results = getEvaluationResults();

    if (results.length === 0) {
        console.warn('[Evaluation] No saved results to export.');
        return;
    }

    const columns = [
        'Run',
        'Function',
        'TransactionHash',
        'BlockNumber',
        'Status',
        'GasUsed',
        'EffectiveGasPriceGwei',
        'TransactionFeeETH',
        'ConfirmationTimeSeconds',
        'WalletAddress',
        'BlockTimestampUTC'
    ];

    const escapeCsv = (value) => {
        const text = String(value ?? '');
        return `"${text.replace(/"/g, '""')}"`;
    };

    const csvRows = [
        columns.join(','),
        ...results.map(row => columns.map(col => escapeCsv(row[col])).join(','))
    ];

    const blob = new Blob(['\uFEFF' + csvRows.join('\n')], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'HealthChain_Sepolia_Evaluation_Results.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Make evaluation utilities easy to use from the browser console.
window.showEvaluationResults = showEvaluationResults;
window.downloadEvaluationCSV = downloadEvaluationCSV;
window.clearEvaluationResults = clearEvaluationResults;


async function login() {
    try {
        const address = await connectWallet();
        const [name, role] = await contract.getActorInfo(address);
        const numericRole = Number(role);

        if (numericRole === 0) {
            showNotification("This wallet is not registered. Please register first.", "error");
            return;
        }

        sessionStorage.setItem('userAddress', address);
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userRole', numericRole);

        showNotification(`Welcome, ${name}!`, "success");
        updateUI();
    } catch (err) {
        console.error(err);
        showNotification(err.message || "Login failed. Check MetaMask and console.", "error");
    }
}

async function register() {
    const name = document.getElementById('registerName').value;
    const role = document.getElementById('registerRole').value;

    if (!name) {
        showNotification("Please provide a name.", "error");
        return;
    }
    
    try {
        const address = await connectWallet();
        const tx = await contract.register(name, parseInt(role));
        await measureTransaction("Actor Registration", tx);

        sessionStorage.setItem('userAddress', address);
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userRole', parseInt(role));

        showNotification("Registration successful!", "success");
        updateUI();
    } catch (err) {
        console.error(err);
        const message = err.data?.message || err.reason || err.message || "Registration failed. See console.";
        const errorMessage = message.includes("Address already registered") 
            ? "This wallet is already registered." 
            : message;
        showNotification(errorMessage, "error");
    }
}

function logout() {
    sessionStorage.clear();
    signer = null;
    contract = null;
    document.getElementById('currentUser').innerText = "Not Logged In";
    showPage('loginPage');
    document.getElementById('logoutButton').style.display = 'none';
}

async function listCompanyPlans() {
    const companyAddress = sessionStorage.getItem('userAddress');
    const plansListDiv = document.getElementById('companyPlansList');
    plansListDiv.innerHTML = '<em>Loading plans...</em>';

    try {
        const planIds = await contract.getCompanyPlans(companyAddress);

        if (planIds.length === 0) {
            plansListDiv.innerHTML = '<p>You have not created any plans yet.</p>';
            return;
        }

        let plansHTML = '<h3>Your Active Plans</h3>';
        // Loop through each plan ID to get its full details
        for (const planId of planIds) {
            const [planName, , coverageLimit] = await contract.getPlanInfo(planId);
            const coveredServices = await contract.getPlanCoveredServices(planId);

            let servicesHtml = '<ul>';
            coveredServices.forEach(service => {
                servicesHtml += `<li>${service}</li>`;
            });
            servicesHtml += '</ul>';

            plansHTML += `
                <div class="plan-card">
                    <h4>${planName} (ID: ${planId})</h4>
                    <p><strong>Coverage Limit:</strong> ${coverageLimit}</p>
                    <h5>Covered Services:</h5>
                    ${servicesHtml}
                </div>
            `;
        }
        plansListDiv.innerHTML = plansHTML;
    } catch (e) {
        console.error(e);
        plansListDiv.innerHTML = '<p>Could not fetch plans. See console for errors.</p>';
        showNotification("Error fetching plans.", "error");
    }
}

async function addMedicine() {
    const medicineName = document.getElementById('newMedicineName').value;
    const medicineCost = document.getElementById('newMedicineCost').value;

    if (!medicineName || !medicineCost || medicineCost <= 0) {
        showNotification("Please provide a valid medicine name and cost.", "error");
        return;
    }

    try {
        const tx = await contract.addPlatformItem(medicineName, medicineCost);
        await tx.wait();
        showNotification(`Medicine '${medicineName}' added successfully!`, "success");

        // Clear the input fields
        document.getElementById('newMedicineName').value = '';
        document.getElementById('newMedicineCost').value = '';

        // Refresh the dashboard to show the new medicine in the checklist below
        await loadProviderDashboard(); 
    } catch (e) {
        console.error(e);
        showNotification("Failed to add medicine. It may already exist.", "error");
    }
}

// --- 5. UI AND DASHBOARD LOADERS ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

async function updateUI() {
    const role = parseInt(sessionStorage.getItem('userRole'));
    const name = sessionStorage.getItem('userName');
    const address = sessionStorage.getItem('userAddress');

    document.getElementById('currentUser').innerHTML = `Logged In: <strong>${name}</strong><br><small>${address}</small>`;
    document.getElementById('logoutButton').style.display = 'block';

    switch (role) {
        case 1: // Patient
            showPage('patientDashboard');
            await loadPatientDashboard();
            break;
        case 2: // Hospital
        case 3: // Clinic
            showPage('providerDashboard');
            document.getElementById('hospitalClinicSection').style.display = 'block';
            document.getElementById('pharmacySection').style.display = 'none';
            await loadProviderDashboard();
            break;
        case 4: // Pharmacy
            showPage('providerDashboard');
            document.getElementById('hospitalClinicSection').style.display = 'none';
            document.getElementById('pharmacySection').style.display = 'block';
            await loadProviderDashboard();
            break;
        case 5: // Insurance Company
            showPage('insuranceDashboard');
            await loadInsuranceDashboard();
            break;
        default:
            showPage('loginPage');
    }
}

async function loadPatientDashboard() {
    const myPlanSection = document.getElementById('myPlanSection');
    const address = sessionStorage.getItem('userAddress');
    const [planId, currentBalance, isEnrolled] = await contract.getPatientPlan(address);

    // This section for displaying the user's currently enrolled plan remains the same.
    if (isEnrolled) {
        const [planName, , coverageLimit, companyName] = await contract.getPlanInfo(planId);
        const balancePercentage = (currentBalance / coverageLimit) * 100;
        const services = await contract.getPlanCoveredServices(planId);
        let servicesHtml = '<ul>';
        services.forEach(service => { servicesHtml += `<li>${service}</li>`; });
        servicesHtml += '</ul>';

        myPlanSection.innerHTML = `
            <h3>My Current Plan</h3>
            <div class="plan-card">
                <h4>${planName} (from ${companyName})</h4>
                <p><strong>Balance:</strong> ${currentBalance} / ${coverageLimit}</p>
                <div class="balance-bar">
                    <div class="balance-fill" style="width: ${balancePercentage}%;">${Math.round(balancePercentage)}%</div>
                </div>
                <h5 style="margin-top: 20px; margin-bottom: 10px;">Covered Services:</h5>
                ${servicesHtml}
            </div>`;
    } else {
        myPlanSection.innerHTML = '<h3>You are not enrolled in any plan.</h3>';
    }

    const allPlansList = document.getElementById('allPlansList');
    allPlansList.innerHTML = 'Loading plans...';
    let plansHTML = '';

    // --- The main change is in this loop ---
    for (let i = 1; i < 20; i++) { // Check for up to 20 plans
        try {
            const [planName, companyAddress, coverageLimit, companyName] = await contract.getPlanInfo(i);
            if(companyAddress !== ethers.constants.AddressZero) {
                
                // **** NEW: Fetch and display services for EVERY plan in the list ****
                const coveredServices = await contract.getPlanCoveredServices(i);
                let servicesListHtml = '<ul style="font-size: 0.9em; padding-left: 20px;">';
                coveredServices.forEach(service => {
                    servicesListHtml += `<li>${service}</li>`;
                });
                servicesListHtml += '</ul>';
                // **** END NEW SECTION ****

                const isCurrentPlan = isEnrolled && planId.toString() === i.toString();
                const isDisabled = isCurrentPlan && currentBalance > 0;
                const buttonText = isCurrentPlan ? 'Re-Enroll (Refill)' : 'Switch to this Plan';

                plansHTML += `
                    <div class="plan-card">
                        <h4>${planName}</h4>
                        <p><strong>Provider:</strong> ${companyName}</p>
                        <p><strong>Coverage:</strong> ${coverageLimit} units</p>
                        
                        <h5 style="margin-top: 15px; margin-bottom: 5px;">What's Covered:</h5>
                        ${servicesListHtml}
                        
                        <button class="enroll-btn" data-plan-id="${i}" ${isDisabled ? 'disabled title="You cannot re-enroll until your balance is 0"' : ''}>
                            ${isEnrolled ? buttonText : 'Enroll'}
                        </button>
                    </div>`;
            }
        } catch (e) { 
            // This is expected when we run out of plans to check, so we can safely break.
            break; 
        }
    }
    allPlansList.innerHTML = plansHTML || "No insurance plans have been created yet.";
}

async function loadInsuranceDashboard() {
    // --- Part 1: Load Services (no change here) ---
    try {
        const services = await contract.getAllServices(); 
        const checkboxesDiv = document.getElementById('servicesCheckboxes');
        checkboxesDiv.innerHTML = '';
        services.forEach(service => {
            const serviceId = service.replace(/\s+/g, '-');
            checkboxesDiv.innerHTML += `
                <div class="checkbox-item">
                    <input type="checkbox" id="${serviceId}" name="services" value="${service}">
                    <label for="${serviceId}">${service}</label>
                </div>
            `;
        });
    } catch (e) { /* ... */ }

    // --- Part 2: NEW - Load Providers for Exclusion ---
    try {
        const providerListDiv = document.getElementById('providerExclusionList');
        providerListDiv.innerHTML = '<em>Loading providers...</em>';
        const actorAddresses = await contract.getAllActorAddresses();
        let providersHTML = '';
        for (const address of actorAddresses) {
            const [name, role] = await contract.getActorInfo(address);
            // We only want to list providers (Hospitals, Clinics, Pharmacies)
            if (role === 2 || role === 3 || role === 4) {
                const roleName = {2: 'Hospital', 3: 'Clinic', 4: 'Pharmacy'}[role];
                providersHTML += `
                    <div class="checkbox-item">
                        <input type="checkbox" id="ex-${address}" name="excludeProvider" value="${address}">
                        <label for="ex-${address}">${name} (${roleName})</label>
                    </div>
                `;
            }
        }
        providerListDiv.innerHTML = providersHTML || '<p>No providers have registered yet.</p>';
    } catch (e) {
        console.error("Could not load providers:", e);
        showNotification("Error fetching provider list from contract.", "error");
    }
}

async function loadProviderDashboard() {
    const services = await contract.getAllServices();
    const servicesCheckboxes = document.getElementById('servicesCheckboxesProvider'); // For hospital/clinic
    const medicinesCheckboxes = document.getElementById('medicinesCheckboxes');     // For pharmacy
    servicesCheckboxes.innerHTML = '';
    medicinesCheckboxes.innerHTML = '';

    services.forEach(service => {
        const serviceId = service.replace(/\s+/g, '-');
        const itemHTML = `
            <div class="checkbox-item">
                <input type="checkbox" id="item-${serviceId}" name="providerItems" value="${service}">
                <label for="item-${serviceId}">${service}</label>
            </div>
        `;
        // Logic to decide where the item goes: service list or medicine list
        if (['consultation', 'test', 'x-ray', 'checkup', 'cleaning', 'scan', 'physiotherapy'].some(keyword => service.toLowerCase().includes(keyword))) {
            servicesCheckboxes.innerHTML += itemHTML.replace('providerItems', 'services');
        } else {
            medicinesCheckboxes.innerHTML += itemHTML.replace('providerItems', 'medicines');
        }
    });
}


// --- 6. CONTRACT INTERACTION FUNCTIONS ---

async function enrollInPlan(planId) {
    // Get current enrollment status to provide a better confirmation message
    const signerAddress = await getCurrentSignerAddress();
    const [currentPlanId, , isEnrolled] = await contract.getPatientPlan(signerAddress);

    let confirmationMessage = 'Are you sure you want to enroll in this new plan?';
    if (isEnrolled) {
        if (currentPlanId.toString() === planId.toString()) {
            confirmationMessage = 'This will refill your plan balance to its maximum. Are you sure?';
        } else {
            confirmationMessage = 'This will cancel your current plan and switch to this new one. Are you sure?';
        }
    }

    if (!confirm(confirmationMessage)) return;

    try {
        const tx = await contract.enrollInPlan(planId);
        await measureTransaction("Patient Enrollment", tx);
        showNotification("Successfully enrolled in the new plan!", "success");
        await loadPatientDashboard(); // Refresh the dashboard
    } catch(e) {
        console.error(e);
        showNotification("Failed to enroll. See console for details.", "error");
    }
}

async function createPlan() {
    const planName = document.getElementById('planName').value;
    const coverageLimit = document.getElementById('coverageLimit').value;
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

    // **** NEW: Get the addresses of providers to exclude ****
    const excludedProviders = Array.from(document.querySelectorAll('input[name="excludeProvider"]:checked')).map(cb => cb.value);

    if (!planName || !coverageLimit || selectedServices.length === 0) {
        showNotification("Please fill all fields and select services.", "error");
        return;
    }

    try {
        // **** Pass the new array as the last argument ****
        const tx = await contract.createPlan(planName, coverageLimit, selectedServices, excludedProviders);
        await measureTransaction("Insurance Plan Creation", tx);
        showNotification("Plan created successfully!", "success");
        // ... (code to clear the form) ...
        document.querySelectorAll('input[name="excludeProvider"]:checked').forEach(cb => cb.checked = false); // Also clear exclusion checkboxes
    } catch (e) {
        console.error(e);
        showNotification("Failed to create plan. See console.", "error");
    }
}

async function provideService() {
    const patientAddress = document.getElementById('patientAddress').value;
    const serviceName = document.getElementById('serviceSelect').value;
    
    if (!ethers.utils.isAddress(patientAddress)) {
        showNotification("Invalid patient address.", "error");
        return;
    }
    try {
        const tx = await contract.provideService(patientAddress, serviceName);
        await measureTransaction("Service Provision", tx);
        showNotification("Service processed successfully!", "success");
    } catch (e) {
        console.error(e);
        showNotification("Service failed. Check plan coverage and balance.", "error");
    }
}

async function provideServices() {
    const patientAddress = document.getElementById('patientAddress').value;
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

    if (!ethers.utils.isAddress(patientAddress)) {
        showNotification("Invalid patient address.", "error");
        return;
    }
    if (selectedServices.length === 0) {
        showNotification("Please select at least one service.", "error");
        return;
    }

    showNotification("Processing transaction...", "success"); // Initial feedback

    // Listen for our detailed event
    const providerAddress = await getCurrentSignerAddress();
    contract.once("ItemsProcessed", (patient, provider, totalCost, covered, uncovered, event) => {
        // Make sure the event is for us
        if (patient.toLowerCase() === patientAddress.toLowerCase() && provider.toLowerCase() === providerAddress.toLowerCase()) {
            let message = `Transaction successful! Total cost: ${totalCost}.`;
            if (uncovered.length > 0) {
                message += ` Uncovered items: ${uncovered.join(', ')}.`;
            }
            showNotification(message, "success");
        }
    });

    try {
        const tx = await contract.provideServices(patientAddress, selectedServices);
        await measureTransaction("Service Provision", tx);
    } catch (e) {
        console.error(e);
        const reason = e.reason || "Transaction failed. Check balance or console.";
        showNotification(reason, "error");
        contract.removeAllListeners("ItemsProcessed"); // Clean up listener on failure
    }
}

async function provideMedicines() {
    const patientAddress = document.getElementById('patientAddress').value;
    const selectedMedicines = Array.from(document.querySelectorAll('input[name="medicines"]:checked')).map(cb => cb.value);

    if (!ethers.utils.isAddress(patientAddress)) {
        showNotification("Invalid patient address.", "error");
        return;
    }
    if (selectedMedicines.length === 0) {
        showNotification("Please select at least one medicine.", "error");
        return;
    }

    showNotification("Processing transaction...", "success"); // Initial feedback

    // Listen for our detailed event
    const providerAddress = await getCurrentSignerAddress();
    contract.once("ItemsProcessed", (patient, provider, totalCost, covered, uncovered, event) => {
        if (patient.toLowerCase() === patientAddress.toLowerCase() && provider.toLowerCase() === providerAddress.toLowerCase()) {
            let message = `Purchase complete! Total cost: ${totalCost}.`;
            if (uncovered.length > 0) {
                message += ` The following items were not covered: ${uncovered.join(', ')}.`;
            }
            showNotification(message, "success");
        }
    });

    try {
        const tx = await contract.provideMedicines(patientAddress, selectedMedicines);
        await measureTransaction("Medicine Provision", tx);
    } catch (e) {
        console.error(e);
        const reason = e.reason || "Transaction failed. Check balance or console.";
        showNotification(reason, "error");
        contract.removeAllListeners("ItemsProcessed"); // Clean up listener on failure
    }
}

async function addService() {
    const serviceName = document.getElementById('newServiceName').value;
    const serviceCost = document.getElementById('newServiceCost').value;

    if (!serviceName || !serviceCost || serviceCost <= 0) {
        showNotification("Please provide a valid service name and cost.", "error");
        return;
    }

    try {
        const tx = await contract.addPlatformItem(serviceName, serviceCost);
        await tx.wait();
        showNotification(`Service '${serviceName}' added successfully!`, "success");
        // Clear inputs and refresh the checkbox list
        document.getElementById('newServiceName').value = '';
        document.getElementById('newServiceCost').value = '';
        await loadInsuranceDashboard(); 
    } catch (e) {
        console.error(e);
        showNotification("Failed to add service. It may already exist.", "error");
    }
}

async function addHospitalService() {
    const serviceName = document.getElementById('newHospitalServiceName').value;
    const serviceCost = document.getElementById('newHospitalServiceCost').value;

    if (!serviceName || !serviceCost || serviceCost <= 0) {
        showNotification("Please provide a valid service name and cost.", "error");
        return;
    }

    try {
        // It calls the same unified function
        const tx = await contract.addPlatformItem(serviceName, serviceCost);
        await tx.wait();
        showNotification(`Service '${serviceName}' added successfully!`, "success");

        // Clear the input fields
        document.getElementById('newHospitalServiceName').value = '';
        document.getElementById('newHospitalServiceCost').value = '';

        // Refresh the dashboard to show the new service in the checklist below
        await loadProviderDashboard(); 
    } catch (e) {
        console.error(e);
        showNotification("Failed to add service. It may already exist.", "error");
    }
}

// --- 7. HELPER FUNCTIONS ---
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = type; // 'success' or 'error'
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}