# HealthChain Sepolia Deployment Steps

## 0) Safety
- Never put a real wallet private key in the frontend.
- Create a new MetaMask wallet/account just for Sepolia testing.
- Keep `.env` private and never upload it to GitHub.

## 1) Install packages
```bash
npm install
```

## 2) Create `.env`
Copy `.env.example` to `.env` and fill:
```env
DEPLOYER_PRIVATE_KEY=your_test_wallet_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=optional_etherscan_key
```

## 3) Fund deployment wallet
Send small Sepolia ETH to the deployer wallet from a Sepolia faucet.

## 4) Compile
```bash
npm run compile
```

## 5) Deploy to Sepolia
```bash
npm run migrate:sepolia
```

Copy the deployed `HealthInsurance` contract address from the terminal.

## 6) Put the address in the frontend
Open:
```text
public/app.js
```
Replace:
```js
const contractAddress = "PASTE_YOUR_SEPOLIA_CONTRACT_ADDRESS_HERE";
```
with the deployed Sepolia address.

## 7) Test locally as static website
Use any simple static server. Example:
```bash
npx serve public
```
Open the local URL, connect MetaMask, switch to Sepolia, and register actors.

## 8) Host publicly
Recommended simple option: Netlify.
- Upload the project folder or connect GitHub repository.
- Build command: leave empty.
- Publish directory: `public`.

## 9) Optional contract verification
If you added `ETHERSCAN_API_KEY`:
```bash
npm run verify:sepolia
```

## Suggested test actors
Register separate MetaMask accounts for:
- Patient
- Hospital
- Clinic
- Pharmacy
- Insurance Company

Each account needs a very small amount of Sepolia ETH to send transactions.
