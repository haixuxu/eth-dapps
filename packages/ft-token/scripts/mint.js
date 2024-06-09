const Web3 = require('web3');
require('dotenv').config();
const { PRIVATE_KEY, ALCHEMY_API_KEY, CONTRACT_ADDRESS } = process.env;

const contract = require('../artifacts/contracts/EthFtToken.sol/EthFtToken.json');
const API_URL = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
const TO_ADDRESS = '0x25C7550d592dbF56A05E79c1D00B2f078945C061';
const WALLET_ADDRESS='0x25C7550d592dbF56A05E79c1D00B2f078945C061';

async function mintFt(contractId, toId, amount) {
  const web3 = new Web3(Web3.givenProvider || API_URL);
  const contractAddress = contractId;
  const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
  const nonce = await web3.eth.getTransactionCount(toId, 'latest');
  console.log('nonce is:', nonce);
  const tx = {
    from: WALLET_ADDRESS,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mint(toId, amount).encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
        if (!err) {
          console.log('success hash is = ', hash);
        } else {
          console.log('mint failure error is', err);
        }
      });
    })
    .catch((err) => {
      console.log('Promise failed:', err);
    });
}

mintFt(CONTRACT_ADDRESS, TO_ADDRESS, 1000_1000_1000_1000);
