require("dotenv").config();
const { TruffleProvider } = require("@harmony-js/core");

//Local
const local_mnemonic = process.env.LOCAL_MNEMONIC;
const local_private_key = process.env.LOCAL_PRIVATE_KEY;
const local_url = process.env.LOCAL_0_URL;

//Testnet
const testnet_mnemonic = process.env.TESTNET_MNEMONIC;
const testnet_private_key = process.env.TESTNET_PRIVATE_KEY;
const testnet_url = process.env.TESTNET_0_URL;

//Mainnet
const mainnet_mnemonic = process.env.MAINNET_MNEMONIC;
const mainnet_private_key = process.env.MAINNET_PRIVATE_KEY;
const mainnet_url = process.env.MAINNET_0_URL;

//GAS - Currently using same GAS accross all environments
gasLimit = process.env.GAS_LIMIT;
gasPrice = process.env.GAS_PRICE;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",
    },
    local: {
      network_id: "2", // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          local_url,
          { memonic: local_mnemonic },
          { shardID: 0, chainId: 2 },
          { gasLimit: gasLimit, gasPrice: gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(local_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
    testnet: {
      network_id: "2", // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          testnet_url,
          { memonic: testnet_mnemonic },
          { shardID: 0, chainId: 2 },
          { gasLimit: gasLimit, gasPrice: gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(testnet_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
    mainnet0: {
      network_id: "1", // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          mainnet_url,
          { memonic: mainnet_mnemonic },
          { shardID: 0, chainId: 1 },
          { gasLimit: gasLimit, gasPrice: gasPrice }
        );
        const newAcc = truffleProvider.addByPrivateKey(mainnet_private_key);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200,
       },
      //  evmVersion: "homestead"
      }
    }
  },
};
