// scripts/deploy.js

async function main() {
    // Get the contract to deploy
    const Store = await ethers.getContractFactory("Participant");
    console.log("Deploying Store contract...");
  
    // Deploy the contract
    const store = await Store.deploy();
    await store.deployed();
  
    console.log("Store contract deployed to:", store.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  