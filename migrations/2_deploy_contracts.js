const Token = artifacts.require("Token");
const PetSurance = artifacts.require("PetSurance");

module.exports = async function(deployer){
    await deployer.deploy(Token);
    const token = await Token.deployed();
    
    await deployer.deploy(PetSurance, token.address);
    const petSurance = await PetSurance.deployed();

    await token.passMinterRole(petSurance.address);
};