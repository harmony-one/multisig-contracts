var DefaultCallbackHandler = artifacts.require("DefaultCallbackHandler");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(DefaultCallbackHandler).then(function (token) {
      console.log(`DefaultCallbackHandler is deployed at ${token.address}`);
    });
  });
};
