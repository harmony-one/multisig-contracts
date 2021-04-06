const GnosisSafe = artifacts.require("GnosisSafe");
const { assert } = require("chai");
const { TypedDataUtils } = require("eth-sig-util");

// DO NOT MODIFY THIS FUNCTION, this is being used in the frontend and the backend service/package.
// WE NEED TO MODIFY THE CONTRACT
function generateSafeTxHash(safeAddress, txArgs) {
  const messageTypes = {
    EIP712Domain: [{ type: "address", name: "verifyingContract" }],
    SafeTx: [
      { type: "address", name: "to" },
      { type: "uint256", name: "value" },
      { type: "bytes", name: "data" },
      { type: "uint8", name: "operation" },
      { type: "uint256", name: "safeTxGas" },
      { type: "uint256", name: "baseGas" },
      { type: "uint256", name: "gasPrice" },
      { type: "address", name: "gasToken" },
      { type: "address", name: "refundReceiver" },
      { type: "uint256", name: "nonce" },
    ],
  };

  const primaryType = "SafeTx";

  const typedData = {
    types: messageTypes,
    domain: {
      verifyingContract: safeAddress,
    },
    primaryType,
    message: {
      to: txArgs.to,
      value: txArgs.value,
      data: txArgs.data,
      operation: txArgs.operation,
      safeTxGas: txArgs.safeTxGas,
      baseGas: txArgs.baseGas,
      gasPrice: txArgs.gasPrice,
      gasToken: txArgs.gasToken,
      refundReceiver: txArgs.refundReceiver,
      nonce: txArgs.nonce,
    },
  };

  return `0x${TypedDataUtils.sign(typedData).toString("hex")}`;
}

contract("GnosisSafe contracts", (accounts) => {
  let gnosisSafe;
  beforeEach(async () => {
    gnosisSafe = await GnosisSafe.deployed();
  });
  it("Should return the correct hash", async () => {
    const txData = {
      to: "0xb4B5c12C05A41deb0190758406862d7d0a76bb31",
      value: "20000000000000000000",
      data: "0x",
      operation: 0,
      safeTxGas: 41505,
      baseGas: 0,
      gasPrice: 0,
      gasToken: "0x0000000000000000000000000000000000000000",
      refundReceiver: "0x0000000000000000000000000000000000000000",
      nonce: 0,
    };

    const hash = await gnosisSafe.getTransactionHash(
      txData.to,
      txData.value,
      txData.data,
      txData.operation,
      txData.safeTxGas,
      txData.baseGas,
      txData.gasPrice,
      txData.gasToken,
      txData.refundReceiver,
      txData.nonce
    );

    console.log("Hash ====> ", hash);

    const safeTxHash = generateSafeTxHash(gnosisSafe.address, txData);
    console.log("safeTxHash ====> ", safeTxHash);
    assert.equal(hash, safeTxHash);
  });
});
