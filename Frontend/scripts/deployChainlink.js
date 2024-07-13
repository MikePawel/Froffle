async function main() {
  // Get the contract to deploy
  const TransferusdcBasic = await ethers.getContractFactory("TransferusdcBasic");
  console.log("Deploying TransferusdcBasic contract...");

  // Deploy the contract
  const transferusdcBasic = await TransferusdcBasic.deploy();
  await transferusdcBasic.deployed();

  console.log("TransferusdcBasic contract deployed to:", transferusdcBasic.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
