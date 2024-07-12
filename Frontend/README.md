# Template React App with MetaMask

This repository is a prebuild React + Vite Web App that utilizes the core functionalities of MetaMask and React Router v6.16.0. While implementing a DApp the login via MetaMask is often desired and this core template solves the problem of having to deal with the underlying Web3 interaction. Since this template is quite basic, it only includes the connection between the web interface and Metamask. However, from this template on forward, one can build any DApp imaginable.


##
To deploy the smart contract to Sepolia use:

```
        npx hardhat compile
        npx hardhat run scripts/deploy.js --network sepolia
```

To verify it use

```
npx hardhat verify --network mumbai <smart_contract_address>
```

## How to deploy and run locally

- Clone the repo:
```
git clone https://github.com/MikePawel/MetaMask-global-state.git
```
- install packages:
```
npm i
```
- run react + vite app:
```
npm run dev
```

Enjoy ;)
