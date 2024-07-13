// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Deploy this contract on the Avalanche Fuji Testnet

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TransferusdcBasic {

    address[] public  eligibleAdd;
    mapping(address => uint256) public addressToScore;

    using SafeERC20 for IERC20;

    error NotEnoughBalanceForFees(uint256 currentBalance, uint256 calculatedFees);
    error NotEnoughBalanceusdcForTransfer(uint256 currentBalance);
    error NothingToWithdraw();
    error NotEligible();


    address public owner;
    IRouterClient private immutable ccipRouter;
    IERC20 private immutable linkToken;
    IERC20 private immutable usdcToken;

    // https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#avalanche-fuji
    address ccipRouterAddress = 0xF694E193200268f9a4868e4Aa017A0118C9a8177;

    // https://docs.chain.link/resources/link-token-contracts#fuji-testnet
    address linkAddress = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;

    // https://developers.circle.com/stablecoins/docs/usdc-on-test-networks
    address usdcAddress = 0x5425890298aed601595a70AB815c96711a31Bc65;

    // https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet#ethereum-sepolia
    //uint64 destinationChainSelector = 16015286601757825753;

    event usdcTransferred(
        bytes32 messageId,
        uint64 destinationChainSelector,
        address receiver,
        uint256 amount,
        uint256 ccipFee
    );

    constructor() {
        owner = msg.sender;
        ccipRouter = IRouterClient(ccipRouterAddress);
        linkToken = IERC20(linkAddress);
        usdcToken = IERC20(usdcAddress);
        addressToScore[0x2d7ed5988bdEB776f416E4B0f9FdC2A2C8f30426] = 70;
        addressToScore[0x0E608dBFE88474A425E2aB65DE014E381b6a24E0] = 30;
        addressToScore[0xD63531d296E34Ac29EFAE0B94Bd007Adf1cAef3D] = 80;

    }

    function transferusdcToSepolia(uint64 destinationChainSelector)  
        external payable 
        returns (bytes32 messageId)
    {
        address _receiver = msg.sender;
        uint256 _amount = 1;
        
        // Check if the sender is eligible
        if (addressToScore[_receiver] < 50) {
            revert NotEligible();
        }

        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: address(usdcToken),
            amount: _amount
        });
        tokenAmounts[0] = tokenAmount;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: "",
            tokenAmounts: tokenAmounts,
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 0})
            ),
            feeToken: address(linkToken)
        });

        uint256 ccipFee = ccipRouter.getFee(
            destinationChainSelector,
            message
        );

        if (ccipFee > linkToken.balanceOf(address(this)))
            revert NotEnoughBalanceForFees(linkToken.balanceOf(address(this)), ccipFee);
        linkToken.approve(address(ccipRouter), ccipFee);

        if (_amount > usdcToken.balanceOf(address(this)))
            revert NotEnoughBalanceusdcForTransfer(usdcToken.balanceOf(address(this)));
        //usdcToken.safeTransferFrom(msg.sender, address(this), _amount);
        usdcToken.approve(address(ccipRouter), _amount);

        // Send CCIP Message
        messageId = ccipRouter.ccipSend(destinationChainSelector, message);

        emit usdcTransferred(
            messageId,
            destinationChainSelector,
            _receiver,
            _amount,
            ccipFee
        );
    }

    function allowanceusdc() public view returns (uint256 usdcAmount) {
        usdcAmount = usdcToken.allowance(msg.sender, address(this));
    }

    function balancesOf(address account) public view returns (uint256 linkBalance, uint256 usdcBalance) {
        linkBalance =  linkToken.balanceOf(account);
        usdcBalance = IERC20(usdcToken).balanceOf(account);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function withdrawToken(
        address _beneficiary,
        address _token
    ) public onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        if (amount == 0) revert NothingToWithdraw();
        IERC20(_token).transfer(_beneficiary, amount);
    }
}