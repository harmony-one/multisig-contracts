var MultiSend = artifacts.require("MultiSend");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(MultiSend).then(function (token) {
      console.log(`MultiSend is deployed at ${token.address}`);
    });
  });
};
