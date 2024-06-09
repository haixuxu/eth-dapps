const hre = require("hardhat");


async function main() {
    const NFT = await hre.ethers.getContractFactory("EthFtToken");
    const nft = await NFT.deploy();
    await nft.deployed();
    console.log("ERC20 token deployed to:", nft.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});