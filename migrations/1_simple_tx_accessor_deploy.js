var SimulateTxAccessor = artifacts.require("SimulateTxAccessor");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(SimulateTxAccessor).then(function (token) {
      console.log(`SimulateTxAccessor is deployed at ${token.address}`);
    });
  });
};
