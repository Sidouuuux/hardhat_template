
async function main(contractName, contractAddress, contractArgs = []) {
  let contractFactory
  let contract

  if (contractAddress == "0") {
    console.log("\n\nš Deploying contract... \n");
    contractFactory = await ethers.getContractFactory(contractName)
    contract = await contractFactory.deploy(contractArgs)

    await contract.deployed()

    console.log(`āØ Contract deployed to ${contract.address} !\n`)
  } else {
    console.log("ā Getting deployed contract...\n");
    contractFactory = await ethers.getContractFactory(contractName);
    contract = await contractFactory.attach(contractAddress);
  }

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    if (contractAddress == "0"){
      console.log("ā Waiting for the contract to be propagated...\n");

      await contract.deployTransaction.wait(6)}
    await verify(contract.address, contractArgs)
  }
  console.log("*-------------*\n| āØ All done |\n*-------------*\n");
}

async function verify(contractAddress, args) {
  console.log("š§ Verifying contract...\n")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("\nā Already Verified !\n")
    } else {
      console.log(e)
    }
  }
}

main("Lock", "0x381CB3C80Ec649dD6d5930e75e079CCa142e6e41")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })