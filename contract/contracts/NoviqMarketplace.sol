// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract NoviqMarketplace {
    address public backendSigner;
    IERC20 public usdcToken;

    event PaymentProcessed(address indexed user, address indexed seller, uint256 amount, string refId);

    constructor(address _usdcToken, address _backendSigner) {
        usdcToken = IERC20(_usdcToken);
        backendSigner = _backendSigner;
    }

    // Updates the backend wallet authorized to process payments
    function setBackendSigner(address _newSigner) external {
        require(msg.sender == backendSigner, "Only current backend can update signer");
        backendSigner = _newSigner;
    }

    // Called by the backend when an API request is successfully served
    function payForService(address user, address seller, uint256 amount, string calldata refId) external {
        require(msg.sender == backendSigner, "Only backend can process payments");
        
        // Transfer USDC directly from the user to the seller
        // Note: The user MUST have called usdcToken.approve(address(this), amount) prior to this
        bool success = usdcToken.transferFrom(user, seller, amount);
        require(success, "USDC transfer failed");

        emit PaymentProcessed(user, seller, amount, refId);
    }
}
