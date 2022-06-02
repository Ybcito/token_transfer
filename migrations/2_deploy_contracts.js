const BaseToken = artifacts.require('BaseToken')

module.exports = async function(deployer, network, accounts) {
  // Base Token
  await deployer.deploy(BaseToken, "UseTokenD", "DWHY", 200000, 1000000000)
  const baseToken = await BaseToken.deployed()
}
