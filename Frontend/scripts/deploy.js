// scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const Store = await ethers.getContractFactory("Store");
    const store = await Store.deploy();
  
    console.log("Store contract address:", store.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  