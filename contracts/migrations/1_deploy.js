const { genExternalNullifier } = require('../utils');
const {ethers} = require('ethers');

const Semaphore = artifacts.require("Semaphore");
// const PoseidonT3 = artifacts.require("PoseidonT3");
// const PoseidonT6 = artifacts.require("PoseidonT6");
const MiMC = artifacts.require("MiMC");
const OneVote = artifacts.require("OneVote");

module.exports = async function (deployer) {
  const depth = 20;
  const externalNullifier = genExternalNullifier('test-voting');

  // await deployer.deploy(PoseidonT3, {
  //   gasPrice: 470000000000,//ethers.utils.parseUnits('30','gwei').toString(),
  //   gasLimit: "2177302"
  // });
  // await deployer.deploy(PoseidonT6);
  
  // deployer.link(PoseidonT3, Semaphore);
  // deployer.link(PoseidonT6, Semaphore);

  await deployer.deploy(MiMC);
  deployer.link(MiMC, Semaphore);
  const semaphore = await deployer.deploy(Semaphore, depth, externalNullifier);
  console.log("Contract (semaphore) address:", semaphore.address)

  const oneVote = await deployer.deploy(OneVote, semaphore.address);
  console.log("OneVote deployed: ", oneVote.address);
};
