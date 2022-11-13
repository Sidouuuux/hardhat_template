require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("./task/account")

/** @type import('hardhat/config').HardhatUserConfig */

const { PRIVATE_KEY, GOERLI_RPC_URL, COINMARKETCAP_API_KEY, ETHERSCAN_API_KEY } = process.env || ""

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    // outputFile: "gas-report.txt",
    // noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "MATIC",
  },
};
