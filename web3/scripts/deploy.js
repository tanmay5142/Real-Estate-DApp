async function main() {
  const RealEstate = await ethers.getContractFactory("RealEstate");

  const realEstate = await RealEstate.deploy();

  await realEstate.deployed();

  console.log("Contract deployed to:", realEstate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});