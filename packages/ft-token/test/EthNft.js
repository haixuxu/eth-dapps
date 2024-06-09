const { expect } = require("chai");
const BigNumber = require('bignumber.js');


describe("Test EthNft", function() {
    it("It should deploy the contract, mint a token, and resolve to the right URI", async function() {
        const NFT = await ethers.getContractFactory("EthNft");
        const nft = await NFT.deploy();
        const URI = "ipfs://Qmay6eHiLRSeuDvQuvzYa4R9Z1SNmyCg6aGG3eUxj4Mx2q";
        await nft.deployed();
        await nft.mint("0x25C7550d592dbF56A05E79c1D00B2f078945C061", URI)
        console.log('1=2=3=213213');
        const ret = await nft.tokenURI(1);
        console.log('1=2=3=',ret);
        expect(ret).to.equal(URI)
    });
});