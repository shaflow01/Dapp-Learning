// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main () {
    const [Alice] = await ethers.getSigners();
    console.log("MultiSigWallet owner is :", Alice.address);
    
    //部署MyToken.sol
    const MultiSigWalletContractFactory = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWalletReceipt = await MultiSigWalletContractFactory.deploy([Alice.address], 1);
    await multiSigWalletReceipt.deployed();
    
    console.log("MultiSigWallet Contract address:", multiSigWalletReceipt.address);

    // Deploy Verify sol
    const verifyContractFactory = await ethers.getContractFactory("Verifier");
    const verifyReceipt = await verifyContractFactory.deploy();
    await verifyReceipt.deployed();

    console.log("Verifier Contract address: ", verifyReceipt.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });