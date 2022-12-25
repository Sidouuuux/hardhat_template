
async function main(contractName, contractAddress = "0", contractArgs = []) {
  let contractFactory
  let contract

  if (contractAddress == "0") {
    console.log("\n\n🚀 Deploying contract... \n");
    contractFactory = await ethers.getContractFactory(contractName)
    contract = await contractFactory.deploy(contractArgs)

    await contract.deployed()

    console.log(`✨ Contract deployed to ${contract.address} !\n`)
  } else {
    console.log("⌛ Getting deployed contract...\n");
    contractFactory = await ethers.getContractFactory(contractName);
    contract = await contractFactory.attach(contractAddress);
  }

  if (contractAddress == "0") {
    console.log("⌛ Waiting for the contract to be propagated...\n");

    await contract.deployTransaction.wait(6)
  }
  await verify(contract.address, contractArgs)
  console.log("*-------------*\n| ✨ All done |\n*-------------*\n");
}

async function verify(contractAddress, args) {
  console.log("🔧 Verifying contract...\n")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("\n✅ Already Verified !\n")
    } else {
      console.log(e)
    }
  }
}

main("rockPaperScissors")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })