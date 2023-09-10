const { ContractPromise, Abi } = require("@polkadot/api-contract");
const { decodeAddress } = require("@polkadot/keyring");
const { u8aToHex, formatBalance, BN, BN_ONE } = require("@polkadot/util");
const { signatureVerify } = require("@polkadot/util-crypto");
const { psp22_contract } = require("../contracts/psp22");

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

const checkIsValidSignature = (signedMessage, signature, address) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};
function readOnlyGasLimit(api) {
  return api.registry.createType("WeightV2", {
    refTime: new BN(1_000_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  });
}
async function execContractQuery(
  callerAddress,
  userAccount,
  api,
  contractAbi,
  contractAddress,
  value = 0,
  queryName
) {
  const contract = new ContractPromise(api, contractAbi, contractAddress);
  const gasLimit = readOnlyGasLimit(api);
  if (gasLimit) {
    try {
      const { result, output } = await contract.query[queryName](
        callerAddress,
        {
          gasLimit,
          value,
        },
        userAccount
      );
      if (result.isOk && output) {
        // @ts-ignore
        const isOk = output.toHuman()?.Ok;
        if (isOk) {
          const stringData = isOk.replace(/,/g, "");
          const toNumber = parseFloat(stringData) / 10 ** 12;
          return toNumber;
        }
      }
    } catch (error) {
      // @ts-ignore
      console.error(`@_@ ${queryName} error >> ${error}`);
    }
  }
  return 0;
}
const roundUp = (v, n = 4) => Math.ceil(v * Math.pow(10, n)) / Math.pow(10, n);

async function fetchUserBalance({
  currentAccount,
  api,
  userAccount,
  isCheckInw,
}) {
  try {
    if (currentAccount && api && userAccount) {
      const {
        data: { free, miscFrozen },
      } = await api.query.system.account(currentAccount);
      const [chainDecimals] = await api.registry.chainDecimals;
      const formattedStrBal = formatBalance(free, {
        withSi: false,
        forceUnit: "-",
        decimals: chainDecimals,
      });
      const formattedStrBalMiscFrozen = formatBalance(miscFrozen, {
        withSi: false,
        forceUnit: "-",
        decimals: chainDecimals,
      });
      const formattedNumBal =
        parseFloat(formattedStrBal.replace(",", "")) -
        parseFloat(formattedStrBalMiscFrozen.replace(",", ""));
      let inwBalance = 0;
      if (isCheckInw) {
        const inwBalanceTmp = await execContractQuery(
          currentAccount,
          userAccount,
          api,
          new Abi(psp22_contract.CONTRACT_ABI),
          psp22_contract.CONTRACT_ADDRESS,
          0,
          "psp22::balanceOf"
        );
        if (inwBalanceTmp) {
          inwBalance = inwBalanceTmp;
        }
      }
      return {
        balance: formattedNumBal,
        inwBalance: inwBalance,
      };
    }
  } catch (e) {
    console.error(e);
  }
  return {
    balance: 0,
    inwBalance: 0,
  };
}

module.exports = {
    roundUp,
    fetchUserBalance,
    checkIsValidSignature
}