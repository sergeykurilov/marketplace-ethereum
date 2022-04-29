const MarketplaceMigration = artifacts.require("Coursemarketplace");

module.exports = function (deployer) {
    deployer.deploy(MarketplaceMigration);
};
