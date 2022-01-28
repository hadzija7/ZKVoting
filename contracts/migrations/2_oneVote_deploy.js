const oneVote = artifacts.require("OneVote");

module.exports = async function (deployer) {
    await deployer.deploy(oneVote);
}