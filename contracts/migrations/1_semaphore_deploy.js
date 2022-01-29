const { genExternalNullifier } = require('../utils');
const {ethers} = require('ethers');

const Semaphore = artifacts.require("Semaphore");
const SemaphoreClient = artifacts.require("SemaphoreClient");
const PoseidonT3 = artifacts.require("PoseidonT3");
const PoseidonT6 = artifacts.require("PoseidonT6");

module.exports = async function (deployer) {
  const depth = 20;
  const externalNullifier = genExternalNullifier('test-voting');

  await deployer.deploy(PoseidonT3, {
    gasPrice: 470000000000,//ethers.utils.parseUnits('30','gwei').toString(),
    gasLimit: "2177302"
  });
  await deployer.deploy(PoseidonT6);

  deployer.link(PoseidonT3, Semaphore);
  deployer.link(PoseidonT6, Semaphore);
  const semaphore = await deployer.deploy(Semaphore, depth, externalNullifier);
  console.log("Contract (semaphore) address:", semaphore.address)
  deployer.deploy(SemaphoreClient, semaphore.address);
};
