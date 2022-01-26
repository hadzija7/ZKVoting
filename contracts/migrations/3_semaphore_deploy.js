const { genExternalNullifier } = require('../utils');

const Semaphore = artifacts.require("Semaphore");
const SemaphoreClient = artifacts.require("SemaphoreClient");
const PoseidonT3 = artifacts.require("PoseidonT3");
const PoseidonT6 = artifacts.require("PoseidonT6");

module.exports = async function (deployer) {
  const depth = 20;
  const externalNullifier = genExternalNullifier('test-voting');

  deployer.link(PoseidonT3, Semaphore);
  deployer.link(PoseidonT6, Semaphore);
  const semaphore = await deployer.deploy(Semaphore, depth, externalNullifier);
  deployer.deploy(SemaphoreClient, semaphore.address);
};
