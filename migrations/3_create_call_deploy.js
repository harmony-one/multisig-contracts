var CreateCall = artifacts.require("CreateCall");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(CreateCall).then(function (token) {
      console.log(`CreateCall is deployed at ${token.address}`);
    });
  });
};
