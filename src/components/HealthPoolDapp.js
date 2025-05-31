import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AdminLogin from "./AdminLogin";
import SubmitRationCard from "./SubmitRationCard";

import { 
  Wallet, 
  Shield, 
  FileText, 
  Heart, 
  Upload, 
  Check, 
  AlertCircle, 
  DollarSign,
  Users,
  Activity,
  Plus
} from 'lucide-react';


const CONTRACT_ADDRESS = "0xc162faf76159447199C8d6b0EAe12920c86Eaf39";

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_validator",
				"type": "address"
			}
		],
		"name": "addValidator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "approveBPLStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "claimId",
				"type": "uint256"
			}
		],
		"name": "approveClaim",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
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
				"name": "user",
				"type": "address"
			}
		],
		"name": "BPLApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "claimId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "ClaimApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "docCID",
				"type": "string"
			}
		],
		"name": "ClaimSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "claimId",
				"type": "uint256"
			}
		],
		"name": "ClaimValidated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "fundPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "joinPool",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "cid",
				"type": "string"
			}
		],
		"name": "RationCardSubmitted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docCID",
				"type": "string"
			}
		],
		"name": "submitClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "rationCID",
				"type": "string"
			}
		],
		"name": "submitRationCard",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "claimId",
				"type": "uint256"
			}
		],
		"name": "validateClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bplMembers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "claims",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "docCID",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "validated",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "paid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllClaims",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "reason",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "docCID",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "validated",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "paid",
						"type": "bool"
					}
				],
				"internalType": "struct HealthPool.Claim[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPendingApprovals",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getRationCardCID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasActiveClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasJoined",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isPendingApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "joinFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payoutAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pendingApprovals",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rationCardCIDs",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "validators",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default function HealthPoolDApp() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [loginError, setLoginError] = React.useState('');
const [pendingApprovals, setPendingApprovals] = React.useState([]);
// State to track which item is loading (for approve button)




  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Contract state
  const [userStatus, setUserStatus] = useState({
    isBPL: false,
    isValidator: false,
    hasJoined: false,
    isOwner: false
  });
  const [poolBalance, setPoolBalance] = useState('0');
  const [claims, setClaims] = useState([]);
  const [joinFee, setJoinFee] = useState('0');
  const [payoutAmount, setPayoutAmount] = useState('0');
  
  // Form states
  const [rationCardCID, setRationCardCID] = useState('');
  const [claimReason, setClaimReason] = useState('');
  const [claimDocCID, setClaimDocCID] = useState('');
  const [bplUserAddress, setBplUserAddress] = useState('');
  const [validatorAddress, setValidatorAddress] = useState('');
  const [fundAmount, setFundAmount] = useState('');
 
async function fetchPendingApprovals() {
  try {
    setLoading(true);
    const pendingAddresses = await contract.getPendingApprovals();

    const formattedApprovals = await Promise.all(
      pendingAddresses.map(async (address) => {
        try {
          const cid = await contract.getRationCardCID(address);
          return { address, cid };
        } catch (err) {
          console.error("Error fetching CID for", address, err);
          return { address, cid: "CID not found" };
        }
      })
    );

    setPendingApprovals(formattedApprovals);
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
  } finally {
    setLoading(false);
  }
}


async function handleApproveBPLStatus(userAddress) {
  try {
    setLoadingId(userAddress);
    const tx = await contract.approveBPLStatus(userAddress);
    await tx.wait();
    alert('BPL status approved successfully!');
    await fetchPendingApprovals();
  } catch (error) {
    console.error("Error approving BPL:", error);
  } finally {
    setLoadingId(null);
  }
}



  useEffect(() => {
    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (contract && account) {
      loadContractData();
    }
  }
  , [contract, account]);
  
  

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this DApp');
      return;
    }

    try {
      setLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setContract(contract);
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const loadContractData = async () => {
    try {
      setLoading(true);
      
      const [
        isBPL,
        isValidator, 
        hasJoined,
        owner,
        balance,
        allClaims,
        joinFeeAmount,
        payoutAmountValue
      ] = await Promise.all([
        contract.bplMembers(account),
        contract.validators(account),
        contract.hasJoined(account),
        contract.owner(),
        contract.getPoolBalance(),
        contract.getAllClaims(),
        contract.joinFee(),
        contract.payoutAmount()
      ]);

      setUserStatus({
        isBPL,
        isValidator,
        hasJoined,
        isOwner: owner.toLowerCase() === account.toLowerCase()
      });
      
      setPoolBalance(ethers.formatEther(balance));
      setClaims(allClaims);
      setJoinFee(ethers.formatEther(joinFeeAmount));
      setPayoutAmount(ethers.formatEther(payoutAmountValue));
      
    } catch (error) {
      console.error('Error loading contract data:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitRationCard = async () => {
    if (!rationCardCID.trim()) {
      alert('Please enter IPFS CID for ration card');
      return;
    }
    
    try {
      setLoading(true);
      const tx = await contract.submitRationCard(rationCardCID);
      await tx.wait();
      alert('Ration card submitted successfully!');
      setRationCardCID('');
    } catch (error) {
      console.error('Error submitting ration card:', error);
      alert(`Failed to submit ration card: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const joinPool = async () => {
    try {
      setLoading(true);
      const tx = await contract.joinPool({ value: ethers.parseEther(joinFee) });
      await tx.wait();
      alert('Successfully joined the health pool!');
      await loadContractData();
    } catch (error) {
      console.error('Error joining pool:', error);
      alert('Failed to join pool');
    } finally {
      setLoading(false);
    }
  };

  const submitClaim = async () => {
    if (!claimReason.trim() || !claimDocCID.trim()) {
      alert('Please fill in all claim details');
      return;
    }
    
    try {
      setLoading(true);
      const tx = await contract.submitClaim(claimReason, claimDocCID);
      await tx.wait();
      alert('Claim submitted successfully!');
      setClaimReason('');
      setClaimDocCID('');
      await loadContractData();
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim');
    } finally {
      setLoading(false);
    }
  };

//   const approveBPLStatus = async () => {
//   if (!ethers.isAddress(bplUserAddress)) {
//     alert('Please enter a valid Ethereum address');
//     return;
//   }

//   try {
//     setLoading(true);
//     const tx = await contract.approveBPLStatus(bplUserAddress);
//     await tx.wait();
//     alert('BPL status approved successfully!');
//     setBplUserAddress('');

//     // 🔄 Reload user status so UI updates
//     await loadContractData();
//   } catch (error) {
//     console.error('Error approving BPL status:', error);
//     alert('Failed to approve BPL status');
//   } finally {
//     setLoading(false);
//   }
// };


  const validateClaim = async (claimId) => {
    try {
      setLoading(true);
      const tx = await contract.validateClaim(claimId);
      await tx.wait();
      alert('Claim validated successfully!');
      await loadContractData();
    } catch (error) {
      console.error('Error validating claim:', error);
      alert('Failed to validate claim');
    } finally {
      setLoading(false);
    }
  };


const approveClaim = async (claimId) => {
  try {
    setLoadingId(claimId); // Show loading for the current claim

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.approveClaim(claimId);
    await tx.wait();

    alert("✅ Claim approved!");
    await loadContractData(); // Refresh the UI
  } catch (err) {
    console.error("❌ Error approving claim:", err);
    alert(`❌ ${err?.reason || err?.message}`);
  } finally {
    setLoadingId(null); // Stop loading for the current claim
  }
};




  const fundPool = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    try {
      setLoading(true);
      const tx = await contract.fundPool({ value: ethers.parseEther(fundAmount) });
      await tx.wait();
      alert('Pool funded successfully!');
      setFundAmount('');
      await loadContractData();
    } catch (error) {
      console.error('Error funding pool:', error);
      alert('Failed to fund pool');
    } finally {
      setLoading(false);
    }
  };

  const addValidator = async () => {
    if (!ethers.isAddress(validatorAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }
    
    try {
      setLoading(true);
      const tx = await contract.addValidator(validatorAddress);
      await tx.wait();
      alert('Validator added successfully!');
      setValidatorAddress('');
    } catch (error) {
      console.error('Error adding validator:', error);
      alert('Failed to add validator');
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ condition, trueText, falseText, trueColor = "bg-green-100 text-green-800", falseColor = "bg-red-100 text-red-800" }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${condition ? trueColor : falseColor}`}>
      {condition ? trueText : falseText}
    </span>
  );

  const TabButton = ({ id, children, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </button>
  );

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
              <Heart className="w-12 h-12 text-blue-600 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Government Health Pool</h1>
            <p className="text-gray-600 mb-8">Connect your wallet to access healthcare benefits for BPL families</p>
            <button
              onClick={connectWallet}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Wallet size={20} />
              <span>{loading ? 'Connecting...' : 'Connect MetaMask'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  


  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Government Health Pool</h1>
                <p className="text-sm text-gray-500">Healthcare for All</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Connected Account</p>
                <p className="font-mono text-sm text-gray-900">{account.slice(0, 6)}...{account.slice(-4)}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Pool: {parseFloat(poolBalance).toFixed(3)} ETH
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">BPL Status</p>
                <StatusBadge 
                  condition={userStatus.isBPL} 
                  trueText="Verified" 
                  falseText="Not Verified"
                />
              </div>
              <Shield className={`w-8 h-8 ${userStatus.isBPL ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pool Member</p>
                <StatusBadge 
                  condition={userStatus.hasJoined} 
                  trueText="Joined" 
                  falseText="Not Joined"
                />
              </div>
              <Users className={`w-8 h-8 ${userStatus.hasJoined ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Validator Status</p>
                <StatusBadge 
                  condition={userStatus.isValidator} 
                  trueText="Validator" 
                  falseText="Regular User"
                  trueColor="bg-purple-100 text-purple-800"
                />
              </div>
              <Activity className={`w-8 h-8 ${userStatus.isValidator ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <StatusBadge 
                  condition={userStatus.isOwner} 
                  trueText="Government" 
                  falseText="Citizen"
                  trueColor="bg-yellow-100 text-yellow-800"
                />
              </div>
              <DollarSign className={`w-8 h-8 ${userStatus.isOwner ? 'text-yellow-600' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-4 border-b">
            <div className="flex flex-wrap gap-2">
              <TabButton id="dashboard" icon={Activity}>Dashboard</TabButton>
              <TabButton id="apply" icon={FileText}>BPL Verification</TabButton>
              {userStatus.isBPL && <TabButton id="join" icon={Plus}>Join Pool</TabButton>}
              {userStatus.hasJoined && <TabButton id="claim" icon={Heart}>Submit Claim</TabButton>}
              {userStatus.isValidator && <TabButton id="validate" icon={Check}>Validate Claims</TabButton>}
              {userStatus.isOwner && <TabButton id="admin" icon={Shield}>Admin Panel</TabButton>}
            </div>
          </div>

          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Pool Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-blue-700">Balance:</span> {parseFloat(poolBalance).toFixed(4)} ETH</p>
                      <p><span className="text-blue-700">Join Fee:</span> {joinFee} ETH</p>
                      <p><span className="text-blue-700">Payout Amount:</span> {payoutAmount} ETH</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Your Status</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-green-700">BPL Verified:</span> {userStatus.isBPL ? 'Yes' : 'No'}</p>
                      <p><span className="text-green-700">Pool Member:</span> {userStatus.hasJoined ? 'Yes' : 'No'}</p>
                      <p><span className="text-green-700">Validator:</span> {userStatus.isValidator ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Total Claims</h3>
                    <div className="text-2xl font-bold text-purple-900">{claims.length}</div>
                    <p className="text-sm text-purple-700">
                      {claims.filter(c => c.validated && c.paid).length} approved
                    </p>
                  </div>
                </div>

                {/* Recent Claims Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Claims</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">ID</th>
                          <th className="text-left py-3 px-4">User</th>
                          <th className="text-left py-3 px-4">Reason</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {claims.slice(0, 5).map((claim, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">#{index}</td>
                            <td className="py-3 px-4 font-mono text-sm">
                              {claim.user.slice(0, 6)}...{claim.user.slice(-4)}
                            </td>
                            <td className="py-3 px-4">{claim.reason}</td>
                            <td className="py-3 px-4">
                              {claim.paid ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span>
                              ) : claim.validated ? (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Validated</span>
                              ) : (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Apply for BPL Tab */}
            {activeTab === 'apply' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for BPL Verification</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900">Requirements</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Upload your BPL card number. A validator will review your application.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BPL Card Number
                    </label>
                    <input
                      type="text"
                      value={rationCardCID}
                      onChange={(e) => setRationCardCID(e.target.value)}
                      placeholder=""
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button
                    onClick={submitRationCard}
                    disabled={loading || !rationCardCID.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Upload size={18} />
                    <span>{loading ? 'Submitting...' : 'Submit Ration Card'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Continue with remaining tabs... */}
            {/* Submit Claim Tab */}
{activeTab === 'claim' && (
  <div className="max-w-2xl">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Claim</h2>

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-900">Claim Submission Guidelines</h3>
          <p className="text-sm text-yellow-700 mt-1">
            Provide a reason for your claim and provide relevant supporting document Number.
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Claim Reason</label>
        <input
          type="text"
          value={claimReason}
          onChange={(e) => setClaimReason(e.target.value)}
          placeholder="Describe the reason for your claim"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Document Number</label>
        <input
          type="text"
          value={claimDocCID}
          onChange={(e) => setClaimDocCID(e.target.value)}
          placeholder=""
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <button
        onClick={submitClaim}
        disabled={loading || !claimReason.trim() || !claimDocCID.trim()}
        className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2"
      >
        <Upload size={18} />
        <span>{loading ? 'Submitting...' : 'Submit Claim'}</span>
      </button>
    </div>
  </div>
)}

{/* Validate Claims Tab */}
{activeTab === 'validate' && (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Validate Claims</h2>

    {claims.length === 0 ? (
      <p className="text-gray-700">No claims available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Document Number</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4 font-mono text-sm">#{index}</td>
                <td className="py-2 px-4 font-mono text-xs break-all">{claim.user}</td>
                <td className="py-2 px-4">{claim.reason}</td>
                <td className="py-2 px-4 font-mono text-xs break-all">
                  <a
                    href={`https://ipfs.io/ipfs/${claim.docCID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {claim.docCID}
                  </a>
                </td>
                <td className="py-2 px-4">
                  {claim.paid ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span>
                  ) : claim.validated ? (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Validated</span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {!claim.validated && !claim.paid ? (
                    <button
                      onClick={() => validateClaim(index)}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-1 px-3 rounded transition-colors text-sm"
                    >
                      {loading ? 'Validating...' : 'Validate'}
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

{ /* join pool */ }
{activeTab === 'join' && userStatus.isBPL && (
  <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Join Health Pool</h2>
    <input
      type="text"
      placeholder="Enter joining fee in ETH (e.g., 0.01)"
      value={joinFee}
      onChange={(e) => setJoinFee(e.target.value)}
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={joinPool}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded transition"
    >
      {loading ? 'Joining...' : 'Join Pool'}
    </button>
  </div>
)}

{/* admin */}
{activeTab === 'admin' && userStatus.isOwner && (
  <>
    {/* Simple frontend login form */}
    {!adminLoggedIn ? (
      <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

        <button
          onClick={() => {
            if (username === 'admin' && password === 'password123') {
              setAdminLoggedIn(true);
              setLoginError('');
              fetchPendingApprovals(); // Fetch pending approvals on login
            } else {
              setLoginError('Invalid username or password');
            }
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Login
        </button>
      </div>
    ) : (
      <>
        {/* Logout Button */}
        <div className="max-w-xl mx-auto mb-6 flex justify-end">
          <button
            onClick={() => setAdminLoggedIn(false)}
            className="text-red-600 underline"
          >
            Logout
          </button>
        </div>

        {/* Add Validator */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Add Validator Address
            </label>
            <input
              type="text"
              value={validatorAddress}
              onChange={(e) => setValidatorAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={addValidator}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Adding...' : 'Add Validator'}
          </button>
        </div>

        {/* Pending BPL Approvals List */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Pending BPL Approvals</h2>
  {pendingApprovals.length === 0 ? (
    <p className="text-gray-600">No pending BPL approval requests.</p>
  ) : (
    pendingApprovals.map(({ address, cid }, idx) => (
      <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow mb-3">
        <div className="mb-2">
          <p className="font-semibold break-all text-sm">Address: {address}</p>
          <p className="text-gray-600 break-all text-sm">CID: {cid}</p>
        </div>
        <button
          onClick={() => handleApproveBPLStatus(address)}
          disabled={loadingId === address}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold py-1 px-3 rounded"
        >
          {loadingId === address ? 'Approving...' : 'Approve'}
        </button>
      </div>
    ))
  )}
</div>



        {/* Claims List */}
        <div className="max-w-xl mx-auto space-y-4 mb-6">
          {claims.map((claim, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <p>
                <strong>Claim ID:</strong> #{index}
              </p>
              <p>
                <strong>User:</strong> {claim.user}
              </p>
              <p>
                <strong>Reason:</strong> {claim.reason}
              </p>
              <button
                onClick={() => approveClaim(index)}
                disabled={loadingId === index}
                className="mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded w-full"
              >
                {loadingId === index ? 'Approving...' : 'Approve & Send Payment'}
              </button>
            </div>
          ))}
        </div>

        {/* Fund Health Pool */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fund Health Pool</h2>
          <input
            type="text"
            placeholder="Enter amount in ETH"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fundPool}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded transition"
          >
            {loading ? 'Funding...' : 'Fund Pool'}
          </button>
        </div>
      </>
    )}
  </>
)}

          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-900 font-medium">Processing transaction...</span>
          </div>
        </div>
      )}
    </div>
  );
}