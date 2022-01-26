const PoseidonT3 = artifacts.require("PoseidonT3");
const PoseidonT6 = artifacts.require("PoseidonT6");

module.exports = async function (deployer) {
    await deployer.deploy(PoseidonT3);
    await deployer.deploy(PoseidonT6);
};
