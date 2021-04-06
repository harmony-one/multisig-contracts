var GnosisSafeProxyFactory = artifacts.require("GnosisSafeProxyFactory");

module.exports = function (deployer) {
  deployer.then(function () {
    return deployer.deploy(GnosisSafeProxyFactory).then(function (token) {
      console.log(`GnosisSafeProxyFactory is deployed at ${token.address}`);
    });
  });
};
