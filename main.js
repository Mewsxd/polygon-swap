import { Wallet, JsonRpcProvider } from "ethers";

const privateKey = "YOUR_PRIVATE_KEY";
const providerURL = "https://polygon-mainnet.infura.io/v3/8ad98f8581a946ecbc2be0abafd59661";
const provider = new JsonRpcProvider(providerURL);

const wallet = new Wallet(privateKey, provider);
console.log(wallet);
const headers = { "0x-api-key": "5138c85b-2b0e-43ea-9fb8-f99fa057a82f" };

const main = async () => {
  const response = await fetch(
    `https://polygon.api.0x.org/swap/v1/price?buyToken=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&sellToken=0x0000000000000000000000000000000000001010&sellAmount=1000000000000000000&takerAddress=0xdcd01bf73A45A9389E3C11a6613196b48e6192bE`,
    { headers }
  );
  const quote = await response.json();
  //   const to = quote.to;
  //   const data = quote.data;
  //   const value = ethers.BigNumber.from(quote.value);
  //   const gasPrice = ethers.BigNumber.from(quote.gasPrice);
  //   const gasLimit = ethers.BigNumber.from(quote.gas);
  const to = quote.to;
  const data = quote.data;
  const value = quote.value;
  const gasPrice = quote.gasPrice;
  const gasLimit = quote.gas;

  const tx = {
    to,
    data,
    value,
    gasPrice,
    gasLimit,
  };

  // Sign and send the transaction
  const signedTx = await wallet.sendTransaction(tx);
  console.log(`Transaction hash: https://polygonscan.com/tx/${signedTx.hash}`);

  // Wait for the transaction to be mined
  const receipt = await signedTx.wait();
  console.log("Transaction was mined in block:", receipt.blockNumber);
};
main();
