// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Store {
    mapping(address => mapping(string => uint256)) private nestedData;

    // Store data in the nested mapping
    function storeData(address _address, string memory content, uint256 score) public {
        nestedData[_address][content] = score;
    }

    // Retrieve data from the nested mapping
    function retrieveData(address _address, string memory content) public view returns (uint256) {
        return nestedData[_address][content];
    }
}
