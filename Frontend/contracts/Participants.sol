// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Participant {

    struct Participant {
        mapping(string => uint) objectives;
        string[] objectiveKeys;
    }

    mapping(address => Participant) participants;

    // Store or update an objective
    function storeOrUpdateObjective(address _address, string memory objectiveKey, uint objectiveValue) public {
        Participant storage participant = participants[_address];
        if (participant.objectives[objectiveKey] == 0) {
            participant.objectiveKeys.push(objectiveKey);
        }
        participant.objectives[objectiveKey] = objectiveValue;
    }

    // Retrieve an objective
    function retrieveObjective(address _address, string memory objectiveKey) public view returns (uint) {
        return participants[_address].objectives[objectiveKey];
    }

    // Retrieve all objectives
    function retrieveAllObjectives(address _address) public view returns (string[] memory, uint[] memory) {
        Participant storage participant = participants[_address];
        uint[] memory values = new uint[](participant.objectiveKeys.length);

        for (uint i = 0; i < participant.objectiveKeys.length; i++) {
            values[i] = participant.objectives[participant.objectiveKeys[i]];
        }

        return (participant.objectiveKeys, values);
    }
}
