// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthPool {
    struct Claim {
        address user;
        string reason;
        string docCID;
        bool validated;
        bool paid;
    }

    address public owner;
    mapping(address => bool) public bplMembers;
    mapping(address => bool) public validators;
    mapping(address => bool) public hasJoined;
    mapping(address => string) public rationCardCIDs;
    mapping(address => bool) public hasActiveClaim;
    mapping(address => bool) public isPendingApproval;

    address[] public pendingApprovals;
    Claim[] public claims;

    uint public joinFee = 0.0001 ether;
    uint public payoutAmount = 0.0005 ether;

    event RationCardSubmitted(address indexed user, string cid);
    event ClaimSubmitted(address indexed user, string reason, string docCID);
    event ClaimValidated(uint indexed claimId);
    event ClaimApproved(uint indexed claimId, address indexed user);
    event BPLApproved(address indexed user);

    constructor() {
        owner = msg.sender;
        validators[msg.sender] = true;
    }

    modifier onlyValidator() {
        require(validators[msg.sender], "Not a validator");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only government (owner) allowed");
        _;
    }

    function submitRationCard(string calldata rationCID) external {
        require(bytes(rationCardCIDs[msg.sender]).length == 0, "Already submitted");
        rationCardCIDs[msg.sender] = rationCID;

        if (!isPendingApproval[msg.sender]) {
            pendingApprovals.push(msg.sender);
            isPendingApproval[msg.sender] = true;
        }

        emit RationCardSubmitted(msg.sender, rationCID);
    }

    function approveBPLStatus(address user) external onlyValidator {
        require(bytes(rationCardCIDs[user]).length > 0, "No ration card submitted");
        bplMembers[user] = true;
        isPendingApproval[user] = false;

        for (uint i = 0; i < pendingApprovals.length; i++) {
            if (pendingApprovals[i] == user) {
                pendingApprovals[i] = pendingApprovals[pendingApprovals.length - 1];
                pendingApprovals.pop();
                break;
            }
        }

        emit BPLApproved(user);
    }

    function joinPool() external payable {
        require(bplMembers[msg.sender], "Not BPL verified");
        require(msg.value == joinFee, "Invalid joining fee");
        require(!hasJoined[msg.sender], "Already joined");
        hasJoined[msg.sender] = true;
    }

    function submitClaim(string calldata reason, string calldata docCID) external {
        require(hasJoined[msg.sender], "Not a member");
        require(!hasActiveClaim[msg.sender], "Already have an active claim");

        claims.push(Claim(msg.sender, reason, docCID, false, false));
        hasActiveClaim[msg.sender] = true;

        emit ClaimSubmitted(msg.sender, reason, docCID);
    }

    function validateClaim(uint claimId) external onlyValidator {
        require(claimId < claims.length, "Invalid claim ID");
        claims[claimId].validated = true;

        emit ClaimValidated(claimId);
    }

    function approveClaim(uint claimId) external payable onlyOwner {
        Claim storage c = claims[claimId];
        require(c.validated && !c.paid, "Invalid or already paid claim");
        require(address(this).balance >= payoutAmount, "Insufficient pool balance");

        c.paid = true;
        hasActiveClaim[c.user] = false;
        payable(c.user).transfer(payoutAmount);

        emit ClaimApproved(claimId, c.user);
    }

    function fundPool() external payable onlyOwner {}

    function addValidator(address _validator) external onlyOwner {
        validators[_validator] = true;
    }

    function getPoolBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getAllClaims() external view returns (Claim[] memory) {
        return claims;
    }

    function getPendingApprovals() external view returns (address[] memory) {
        return pendingApprovals;
    }

    function getRationCardCID(address user) public view returns (string memory) {
        return rationCardCIDs[user];
    }

    receive() external payable {}
}
