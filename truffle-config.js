require('babel-register');
require('babel-polyfill');
require("dotenv").config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

//Local
const local_mnemonic = process.env.LOCAL_MNEMONIC;
const local_private_key = process.env.LOCAL_PRIVATE_KEY;
const local_url = process.env.LOCAL_0_URL;

//Testnet
const testnet_mnemonic = process.env.TESTNET_MNEMONIC;
const testnet_private_key = process.env.TESTNET_PRIVATE_KEY;
const testnet_url = process.env.TESTNET_0_URL;
const testnet_network_id = process.env.TESTNET_NETWORK_ID;

//Mainnet
const mainnet_mnemonic = process.env.MAINNET_MNEMONIC;
const mainnet_private_key = process.env.MAINNET_PRIVATE_KEY;
const mainnet_url = process.env.MAINNET_0_URL;
const mainnet_network_id = process.env.MAINNET_NETWORK_ID;

//GAS - Currently using same GAS accross all environments
gasLimit = process.env.GAS_LIMIT;
gasPrice = process.env.GAS_PRICE;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    testnet: {
        provider: () => {
            return new HDWalletProvider({
            privateKeys: [testnet_private_key],
            providerOrUrl: testnet_url, // https://api.s0.t.hmny.io for mainnet
            numberOfAddresses: 1,
            derivationPath: `m/44'/1023'/0'/0/`
            });
        },
        network_id: 1666700000, // 1666600000 for mainnet
    },
    mainnet: {
        provider: () => {
            return new HDWalletProvider({
            privateKeys: [mainnet_private_key],
            providerOrUrl: mainnet_url, // https://api.s0.t.hmny.io for mainnet
            numberOfAddresses: 1,
            derivationPath: `m/44'/1023'/0'/0/`
            });
        },
        network_id: 1666600000
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.2",
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
}
