require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

INFURA_API_KEY = ""

PRIVATE_KEY = ""

ETHERSCAN_API_KEY = ""

module.exports = {
  solidity: "0.8.24",
  networks: {
    mumbai: {
      url: `${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

