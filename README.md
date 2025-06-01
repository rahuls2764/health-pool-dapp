# 🛡️ Government Health Pool dApp

### A Blockchain-Based Health Insurance System for India's Below Poverty Line (BPL) Citizens

> A decentralized solution to ensure fair, fast, and transparent access to government-backed healthcare benefits — without middlemen or corruption.

---

## 🚨 The Problem

Government health schemes in India for BPL citizens are riddled with inefficiencies:

- **Manual paperwork and corruption** often delay or deny treatment
- Lack of **tracking or transparency** leads to misused funds
- **Middlemen and fake claims** deprive genuine BPL citizens of support
- **One person can exploit the system multiple times**, draining limited resources

---

## ✅ Our Solution: Government Health Pool dApp

The **Government Health Pool dApp** is a blockchain-powered decentralized application that enables BPL citizens to:

- Get verified by submitting their BPL card number
- Join the health pool by paying a minimal fee (0.0001 ETH)
- Submit a one-time medical claim with hospital details
- Receive a **payout of 5×** the joining fee upon government approval

All while ensuring **security, fairness, and immutability** through Ethereum smart contracts.

---

## 💡 Key Features / USPs

- 🔒 **Owner-Controlled Admin Panel**: Only the government (contract owner) can approve BPL verifications and claims
- 👤 **Role-Based Access**: Dynamic frontend UI based on user role (Citizen, Government, Validator)
- ✅ **One-Time Access Control**: A citizen can verify BPL, join the pool, and submit a claim **only once**
- 📜 **On-Chain Verification**: BPL status and claims are recorded transparently
- ⚖️ **Claim Validation**: Validators or owner can verify each claim before payout
- 💵 **5× Fixed Payout**: Government sends a 5x payout after approving the medical claim
- 🏥 **Hospital Document Number**: Each claim must include a document number for authenticity

---

## 🧠 How It Works

### 👤 Citizen
1. Uploads BPL card number to the smart contract
2. Waits for government approval via admin panel
3. Pays 0.0001 ETH to join the pool
4. Submits claim (reason + hospital document number)

### 👑 Government (Owner)
- Approves or rejects BPL applications
- Adds validators
- Validates or rejects submitted claims
- Sends 5× payout to verified pool members
- Funds the pool from time to time

### 🛡️ Validator
- Assists in verifying claim authenticity before government approval

---

## 🧱 Smart Contract Logic

- Written in **Solidity**
- Deployed using **Remix IDE**
- Interacted via **ethers.js** from the frontend
- **Deployed Contract Address** must be manually pasted into the frontend file

### Key Functions

submitBPLCard(string memory bplNumber) public;
approveBPLVerification(address user) public onlyOwner;
joinPool() public payable;
submitClaim(string memory reason, string memory documentId) public;
validateClaim(uint claimId) public onlyValidatorOrOwner;
payoutClaim(uint claimId) public onlyOwner;
addValidator(address validator) public onlyOwner;
fundPool() public payable onlyOwner;

## 👁️‍🗨️ Workflow Overview

A[Citizen: Submit BPL Card Number] --> B[Admin Panel Review]
B --> C[Owner Approves BPL Status]
C --> D[Citizen Joins Pool (0.0001 ETH)]
D --> E[Citizen Submits Claim (Reason + Hospital Doc No)]
E --> F[Validator/Owner Validates Claim]
F --> G[Owner Sends 5× Payout from Pool]
H[Owner Funds Pool] --> G

## 👑 How to Become the Owner (Government)

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create a new Solidity file and paste your smart contract code.
3. Compile the contract and deploy it to your desired Ethereum testnet (e.g., Sepolia, Mumbai) using your wallet.
4. The deploying wallet/account automatically becomes the contract owner (government).
5. Copy the deployed contract address.

## 🖥️ Configuring and Running the Frontend
1. Open the frontend project folder.
2. Open the file `src/HealthPoolDapp.js`.
3. Replace the placeholder contract address with your deployed contract address:

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

4. Save the file.
5. Install dependencies if you haven't yet:
6. The dApp should open in your browser 

---

## 🙌 Thank You!

Thank you for reviewing the Government Health Pool dApp.  
We believe this decentralized solution will empower BPL citizens by ensuring transparent, fair, and efficient access to vital healthcare benefits.  

We welcome your feedback and are excited to contribute to building a healthier, corruption-free future!


## 📞 Contact

For any questions or collaboration, feel free to reach out:  
**Email:** sonirahul2764@gmail.com
**GitHub:** https://github.com/rahuls2764

