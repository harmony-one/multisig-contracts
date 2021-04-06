var GnosisSafe = artifacts.require("GnosisSafe");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(GnosisSafe).then(function (token) {
      console.log(`GnosisSafe is deployed at ${token.address}`);
    });
  });
};
